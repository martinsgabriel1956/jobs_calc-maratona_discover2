let data = [
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
]

module.exports = {
  get() {
    return data;
  },

  update(newJob) {
    data = newJob;
  },

  delete(id) {
    // Verifica se o id é diferente para poder deletar
    data = data.filter(job => Number(job.id) !== Number(id));
  }
}