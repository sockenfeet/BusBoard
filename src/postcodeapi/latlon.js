const request = require("../request");
const consts = require("./consts");
const Coord = require("../coordinates");

module.exports = (postcode, callback) => {
    request(`${consts.baseurl}/${consts.postcodeapi}/${postcode}`, (result) =>
        callback(new Coord(result.result.latitude, result.result.longitude))
    );
};