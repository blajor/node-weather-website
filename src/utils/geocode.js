const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmxham9yIiwiYSI6ImNraGR5a2dpbTAzNDIydHBmOGM2ZzEzdzEifQ.LyMkpfcx5N6SQfpAQEOjDA&limit=1';        

    request({url, json: true}, (error, _, body) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const {center: coordinates, place_name: location} = body.features[0];
            callback(undefined, {
                location, 
                lat: coordinates[1], 
                lon: coordinates[0]
            });
        }
    });
}

module.exports = geocode;