const request = require("request-promise-native");
const HttpStatus = require("http-status-codes");

module.exports = url => {
    return request({
        uri: url,
        resolveWithFullResponse: true
    }).then(response => {
        if (response.statusCode !== 200) {
            throw `Error ${response.statusCode}: ${HttpStatus.getStatusText(response.statusCode)}`;
        }
        return JSON.parse(response.body);
    });
};