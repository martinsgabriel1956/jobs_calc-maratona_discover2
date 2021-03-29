const express = require('express');
const routes = express();

// Pasta onde está os arquivos EJS
const views = __dirname + '/views/'

const profile = {
  name: 'Gabriel',
  avatar: 'https://avatars.githubusercontent.com/u/59969985?v=4',
  'monthly-budget': 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}

// Rota da página principal
routes.get('/', (req, res) => res.render(views + 'index'));

// Rota da página de trabalhos
routes.get('/job', (req, res) => res.render(views + 'job'));

// Rota da página de editar os trabalhos
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));

// Rota da página de perfil do usuário
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }));

// exporta todas as rotas para outros arquivos
module.exports = routes;