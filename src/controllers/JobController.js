const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  save(req, res) {
    const jobs = Job.get();
    // Pega o posicionamento do índice dentro do array
    const lastId = jobs[jobs.length - 1]?.id || 0;
    
    //Cria em envia os trabalhos para o array Jobs
    jobs.push({
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
    const jobs = Job.get();
    // Pega as informações de todos os jobs
    const profile = Profile.get();

    const jobId = req.params.id;

    // Buscar o id dentro do array
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) res.send("Job not found!");

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },
  update(req, res) {
    // Pega as informações de todos os jobs
    const jobs = Job.get();
    
    const jobId = req.params.id;

    // Buscar o id dentro do array
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) res.send("Job not found!");

    // Cria o objeto com os dados existentes mais os atualizados
    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    const newJob = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    // Atualiza as informações dos jobs
    Job.update(newJob);

    return res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
