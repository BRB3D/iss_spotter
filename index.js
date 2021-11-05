/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const {nextISSTimesForMyLocation} = require('./iss');


/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  return fetchCoordsByIP(ip,(error, data) => {
    if (error) {
      console.log(`No lattitude and longitude today boys only an error: ${error}`);
      return;
    }
    return fetchISSFlyOverTimes(data,(error, flyOver) => {
      if (error) {
        console.log(`Error ${error}`);
      }
      console.log(flyOver);
    });
  });
}); */

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});


