const { Router } = require('express'); // Importando apenas o roteamento do express
const DevController = require('./controllers/DevController')
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevController.index);                   // Rota para mostrar usuários
routes.get("/devs/:username", DevController.show);          // Rota para mostrar usuário
routes.post("/devs", DevController.store);                  // Rota para criar usuário
routes.patch("/devs/:username", DevController.update);      // Rota para editar usuário
routes.delete("/devs/:username", DevController.destroy);    // Rota para deletar usuário

routes.get("/search", SearchController.index)

module.exports = routes;


// Métodozinhos HTTP: get, post, put, delete

// Tipos de parâmetros dentro do Express:
// Query Params: request.query (Filtros, ordenação, paginação)
// Route Params: request.params (Recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)