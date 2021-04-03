const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {
    const profiles = Profile.get();

    return res.render( "profile", { profile: profiles})
  },
  update(req, res) {
    const profiles = Profile.get();
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
    
    // Atualiza os dados do Profile
    Profile.update({ 
      ...profiles,
      ...req.body,
      "value-hour": valueHour
    });

    return res.redirect('/profile');
  }
}