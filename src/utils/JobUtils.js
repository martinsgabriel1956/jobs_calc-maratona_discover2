module.exports = {
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
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

    return dayDiff;
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}