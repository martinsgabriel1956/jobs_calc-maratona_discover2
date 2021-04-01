const express = require("express");
const routes = express();

// Pasta onde está os arquivos EJS
const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Gabriel",
    avatar: "https://avatars.githubusercontent.com/u/59969985?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },
  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },
    update(req, res) {
      //req.body apara pegar os dados
      const data = req.body;
      // Definir quantas semanas tem num ano
      const weeksPerYear = 52;
      // Remover as semanas de férias do ano
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      // Quantas horas por semana estou trabalhando
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
      // Total de horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
      // Valor da hora 
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = { 
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      };

      return res.redirect('/profile');
    },

  }
};

const Job = {
  data: [
    {
      id: 1,
      name: "Force Burguer",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
      budget: 4500
    },

    {
      id: 2,
      name: "Island Pizza",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
      budget: 4500
    },
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        // Ajustar o job
        const remaining = Job.services.remainingDays(job);
        // Verifica se o status do projeto está em andamento ou finalizado
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        };
      });

      return res.render(views + "index", { jobs: updatedJobs });
    },
    create(req, res) {
      return res.render(views + "job");
    },
    save(req, res) {
      // Pega o posicionamento do índice dentro do array
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      //Cria em envia os trabalhos para o array Jobs
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        //atribui uma nova data
        created_at: Date.now(),
      });
      // Para retornar para a página inicial
      return res.redirect("/");
    },
    show(req, res) {
      const jobId = req.params.id;

      // Buscar o id dentro do array
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job) res.send('Job not found!');

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
      
      return res.render(views + "job-edit", { job });
    },
    update(req, res) {
      const jobId = req.params.id;

      // Buscar o id dentro do array
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job) res.send('Job not found!');

      // Cria o objeto com os dados existentes mais os atualizados
      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"] ,
        "daily-hours": req.body["daily-hours"] ,
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job;
      })

      
      return res.redirect('/job/' + jobId);
    },
    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));
      
      return res.redirect('/');
    }
  },
  services: {
    remainingDays(job) {
      // Calculo do tempo restante do projeto
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
      // Data que criou o projeto
      const createdDate = new Date(job.created_at);
      // Dia da entrega do projeto
      const dueDay = createdDate.getDate() + Number(remainingDays);
      // A data exata da entrega do prazo limite do projeto.
      const dueDate = createdDate.setDate(dueDay);
      // A diferença de tempo em milissegundos
      const timeDiffInMs = dueDate - Date.now();
      // Transforma milissegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24;
      // A diferença de dias que falta para finalizar o projeto
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
};

// Rota da página principal
routes.get("/", Job.controllers.index);

// Rota da página de trabalhos
routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);

// Rota da página de editar os trabalhos
routes.get("/job/:id", Job.controllers.show);

// Rota para atualizar o projeto
routes.post("/job/:id", Job.controllers.update);

// Rota para atualizar o projeto
routes.post("/job/delete/:id", Job.controllers.delete);

// Rota da página de perfil do usuário
routes.get("/profile", Profile.controllers.index);

// Rota da página de atualização do perfil do usuário
routes.post("/profile", Profile.controllers.update);

// exporta todas as rotas para outros arquivos
module.exports = routes;
