const util = require('util');
const weather = require('weather-js');
exports.getWeather = async(req,res,next) => {
  const weatherPromise = util.promisify(weather.find);
  let weatherDetails = undefined;
  await weatherPromise({
        search: req.body.city,
        degreeType: 'C'
    }).then((weatherData) => {
        weatherDetails = weatherData;
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
          message: error.message
        });
    });
    if(weatherDetails !== undefined) {
       if(weatherDetails.length === 0) {
         res.status(500).json({
             message: 'The Weather Information for the entered city isn\'t available. Please try later'
         });
       } else {
         weatherDetails = weatherDetails[0];
         res.status(200).json({
           message: 'Fetched Weather Information for a city',
           weatherData: {
             city: weatherDetails.location.name,
             temperature: weatherDetails.current.temperature + " C",
             temperature_type: weatherDetails.current.skytext
            }
         });
       }
    }
}
