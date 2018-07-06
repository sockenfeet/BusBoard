const tflConsts = require("./consts");
const tflRequest = require("./tflRequest");
const Bus = require("./bus");
const endPointName = "Arrivals";

module.exports = (stopID, callback) => {
    let url = `${tflConsts.baseurl}/${tflConsts.busapi}/${stopID}/${endPointName}`;
    tflRequest(url, nextBuses => {
        nextBuses.splice(5);
        nextBuses = nextBuses.map(bus => new Bus(bus.lineId, bus.destinationName, Math.floor(bus.timeToStation / 60)));
        nextBuses.sort((b1, b2) => b1.timeToStop - b2.timeToStop);
        callback(nextBuses);
    });
}