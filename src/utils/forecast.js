const request = require('postman-request');

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=1f72c8a762a57c88fccce7089f348c2f&query=' + lat + ',' + lon;
    request({url, json: true}, (error, _, {success, current: {weather_descriptions, temperature, feelslike}} = {}) => {

        if(error) {
            callback('Unable to connect to weather services.', undefined);
        } else if (success === false){
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, 'Currently it is ' + weather_descriptions[0] + ' with ' + temperature + ' degrees. Feels like ' + feelslike + ' degrees.');
        }
    });
}

module.exports = forecast;