const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");

// Rota da página principal
routes.get("/", DashboardController.index);

// Rota da página de trabalhos
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);

// Rota da página de editar os trabalhos
routes.get("/job/:id", JobController.show);

// Rota para atualizar o projeto
routes.post("/job/:id", JobController.update);

// Rota para atualizar o projeto
routes.post("/job/delete/:id", JobController.delete);

// Rota da página de perfil do usuário
routes.get("/profile", ProfileController.index);

// Rota da página de atualização do perfil do usuário
routes.post("/profile", ProfileController.update);

// exporta todas as rotas para outros arquivos
module.exports = routes;