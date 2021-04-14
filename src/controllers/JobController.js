const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  create(req, res) {
    return res.render("job");
  },
  async save(req, res) {
    //Cria em envia os trabalhos para o array Jobs
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      //atribui uma nova data
      created_at: Date.now(),
    })

    // Para retornar para a página inicial
    return res.redirect("/");
  },
  async show(req, res) {
    const jobs = await Job.get();
    // Pega as informações de todos os jobs
    const profile = await Profile.get();

    const jobId = req.params.id;

    // Buscar o id dentro do array
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) res.send("Job not found!");

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    job.budgetConverted = JobUtils.convertCalculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;

    // Cria o objeto com os dados existentes mais os atualizados
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    // Atualiza as informações dos jobs
    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },
  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
