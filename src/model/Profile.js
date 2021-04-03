let data = {
  name: "Gabriel",
  avatar: "https://avatars.githubusercontent.com/u/59969985?v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75,
};

// Manda os dados do Model Profile para arquivos externos
module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  }
}