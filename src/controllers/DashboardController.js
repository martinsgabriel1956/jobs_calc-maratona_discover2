const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    }

    // a quantidade de horas por dia de cada job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map(job => {
      // Ajustar o job
      const remaining = JobUtils.remainingDays(job);
      // Verifica se o status do projeto está em andamento ou finalizado
      const status = remaining <= 0 ? "done" : "progress";

      // Somando a quantidade de status
      statusCount[status] += 1;

      // a quantidade de horas por dia de cada job em progress
      jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // Quantidade de horas de trabalho por dia - a quantidade de horas por dia de cada job
    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours });
  },
  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect("/");
  },
};
