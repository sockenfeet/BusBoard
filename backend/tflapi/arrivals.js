const tflConsts = require("./consts");
const tflRequest = require("./request");
const Bus = require("../bus");
const endPointName = "Arrivals";

module.exports = (stop) =>
    tflRequest(`${tflConsts.baseurl}/${tflConsts.busapi}/${stop.id}/${endPointName}`).then(nextBuses => {
        nextBuses.sort((b1, b2) => b1.timeToStation - b2.timeToStation);
        nextBuses.splice(5);
        nextBuses = nextBuses.map(bus => new Bus(bus.lineId, bus.destinationName, Math.floor(bus.timeToStation / 60)));
        return {
            buses: nextBuses,
            stop: stop
        };
    });