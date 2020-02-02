// Importando bibliotecas novas
const express  = require('express'); // Importando todo o express
const mongoose = require('mongoose');
const cors = require("cors"); // Para ligar a API com o front
const http = require('http'); // Para a aplicação ouvir o http e websocket
// Importando as rotas
const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

// Criando o app utilizando o express
const app = express();
const server = http.Server(app); // Servidor http fora do express

setupWebsocket(server);

// Conectando o banco de dados
// Banco de Dados: MongoDB (yarn add mongoose)
mongoose.connect(
  "mongodb+srv://jlyamin:123@cluster0-eklyx.gcp.mongodb.net/week10?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true); mongoose.set('useFindAndModify', false); // Opções para deprecated warnings

app.use(cors());
app.use(express.json()); // Determina para o express que utilizaremos json
app.use(routes);


server.listen(8888);