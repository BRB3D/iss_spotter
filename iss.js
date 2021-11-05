const request = require('request');
const keyOb = require('./constants');
let apkey = keyOb;

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipObject = JSON.parse(body).ip;
    return callback(null, ipObject);
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=${apkey}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg1 = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg1), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data);
    return;
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(err, resp, data) => {
    if (err) {
      callback(err,null);
      return;
    }
    if (resp.statusCode !== 200) {
      const msg2 = `Status Code ${resp.statusCode} when fetching coordinates for IP. Response: ${data}`;
      callback(Error(msg2), null);
      return;
    }
    const data1 = JSON.parse(data).response;
    callback(null, data1);
  });
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    return fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }
      return fetchISSFlyOverTimes(coordinates, (error, array) => {
        if (error) {
          callback(error, null);
          return;
        }
        array.forEach(value => console.log(`Next pass at ${new Date(value.risetime * 1000)} for ${value.duration} `));
        return;
      });
    });
  });
};







module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
