const request = require("request");
const HttpStatus = require("http-status-codes");

module.exports = (url, callback) => {
    request(url, (err, response, body) => {
        if(err) {
            return console.log(err);
        }
        if(response.statusCode !== 200) {
            return console.log(`Error ${response.statusCode}: ${HttpStatus.getStatusText(response.statusCode)}`);
        }
        let bodyObj;
        try{
            bodyObj = JSON.parse(body);
        } catch (e) {
            return console.log(e);
        }
        callback(bodyObj);
    });
};