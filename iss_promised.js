const request = require('request-promise-native');
const key = require('./constants');

const fetchMyIP = function() {
 return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=${key}`)
}

const fetchISSFlyOverTimes = function(coordinates) {
  const {latitude , longitude} = JSON.parse(coordinates);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}
 

const nextISSTimesForMyLocation = function() {
    return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(object => {
      const array = JSON.parse(object).response;
      return array.forEach(element => console.log(`Next pass at ${new Date(element.risetime * 1000)} for ${element.duration} `));
    }).catch(error => console.log(`Huston we have a problem: ${error}`));
}

module.exports = {nextISSTimesForMyLocation};