const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=210a7a01f6b8573c55d4a951682d9e8e&query=" + latitude + "," + longitude + "&units=f";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        desc: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out, but it feels more like ' + body.current.feelslike + ' degrees.'
      });
    }
  });
};

module.exports = forecast;