const fetch = require('node-fetch');
const Profile = require('../model/Profile.js');

const ProfileUtils = {
  async data() {
    const profileData = await Profile.get().then(res => {
      return res['value-hour'].toFixed(2);
    }).then(data => {
      return data;
    })
   
    return profileData;

  },
  async url() {
    const response = await fetch(`https://economia.awesomeapi.com.br/USD-BRL/`);
    const data = await response.json();

    let currentValue = await ProfileUtils.data() / data[0].high;

    return currentValue.toFixed(2);
  }
}

module.exports = ProfileUtils;