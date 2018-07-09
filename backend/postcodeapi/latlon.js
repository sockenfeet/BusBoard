const request = require("../request");
const consts = require("./consts");
const Coord = require("../coordinates");

module.exports = (postcode) =>
    request(`${consts.baseurl}/${consts.postcodeapi}/${postcode}`)
        .then(result => new Coord(result.result.latitude, result.result.longitude));