const request = require('./request');
const consts = require('./consts');
const BusStop = require('../busstop');
const Coord = require('../coordinates');

const rad = 1000;
let stopTypes = "NaptanPublicBusCoachTram";

module.exports = (coord) =>
    request(`${consts.baseurl}/${consts.busapi}?stopTypes=${stopTypes}&radius=${rad}&lat=${coord.lat}&lon=${coord.lon}`)
        .then(obj => {
            obj = obj.stopPoints;
            obj.sort((b1, b2) => b1.distance - b2.distance);
            obj.splice(2);
            obj = obj.map(bstop => new BusStop(bstop.commonName, bstop.id, bstop.distance, new Coord(bstop.lat, bstop.lon)));
            return obj;
        });