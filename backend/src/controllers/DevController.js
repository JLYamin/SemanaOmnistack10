const axios = require("axios"); // Importando biblioteca que acessa outras APIs
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

// CRIAR OS OUTROS MÉTODOS
// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async show(req, res) {  // Show baseado no login do usuário
    const {username} = req.params

    console.log(username)
    const dev = await Dev.findOne({github_username: username})

    return res.json(dev);
  },

  async store(req, response) {     // O async indica que a função pode demorar a responder por causa do acesso ao GitHub
    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      ); // Só devolve a resposta quando tiver a retorno da api

      let { name = login, avatar_url, bio } = apiResponse.data; // Caso name não exista, substitui por login

      if (name == null) {
        // Caso name não seja undefined mas na vdd seja nulo, substitui por login
        name = apiResponse.data.login;
      }

      const techsArray = parseStringAsArray(techs);

      // Para o Point
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      // Efetivamente criando o dev
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão a no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
  },

  async update (req, res) {
    const { username } = req.params
    let { name, avatar_url, bio, techs, latitude, longitude } = req.body
    const location = undefined;

    techs = parseStringAsArray(techs)

    if (longitude != undefined && latitude != undefined) {
      location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    };

    let options = {
      "omitUndefined": true,  // Opção para ignorar o parametro caso seja undefined
      "new": true             // Opção para retornar a versão atualizada do document
    }

    const dev = await Dev.findOneAndUpdate({github_username: username}, {name, avatar_url, bio, techs, location}, options)

    return res.json(dev);
  },

  async destroy (req, res) {
    const { username } = req.params

    await Dev.findOneAndDelete({ github_username: username });

    return res.status(204).send();
  }
}