// Importa todas as dependências e arquivos
const express = require('express');
const server = express();
const routes = require('./routes');
const path = require('path');

// Adicionar o Template Engine (EJS)
server.set('view engine', 'ejs');

//Muda a localização da pasta views
server.set('views', path.join(__dirname, 'views'));

// Responsável pelo express encontrar os arquivos e estilização e assets do projeto
server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }))

// Utiliza as rotas dentro do servidor
server.use(routes);

// Responsável por iniciar o servidor na porta que decidimos abaixo
server.listen(3000, () => console.log('Server started 🚀'));