const request = require('./request');
const consts = require('./consts');
const BusStop = require('../busstop');

const rad = 1000;
let stopTypes = "NaptanPublicBusCoachTram";

module.exports = (coord, callback) => {
    let url = `${consts.baseurl}/${consts.busapi}?stopTypes=${stopTypes}&radius=${rad}&lat=${coord.lat}&lon=${coord.lon}`;
    request(url, (obj) => {
        obj = obj.stopPoints;
        obj.sort((b1, b2) => b1.distance - b2.distance);
        obj.splice(2);
        obj = obj.map(bstop => new BusStop(bstop.commonName, bstop.id, bstop.distance));
        //console.log(obj);
        callback(obj);
    });
};