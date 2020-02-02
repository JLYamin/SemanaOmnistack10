const Dev = require('../models/Dev')
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias

    const { techs, longitude, latitude } = request.query;

    const techsArray = parseStringAsArray(techs);

    // Passa objeto como filtro
    const devs = await Dev.find({
      techs: {
        $in: techsArray, // Mongo operators
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          // Distance in meters
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs })
  }
}