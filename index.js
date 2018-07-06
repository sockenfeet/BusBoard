const http = require('http');
const request = require('request');
const keys = require('./keys');
const moment = require('moment');

let stopID = '490008660N';

console.log(`please enter a stopID: `);
process.stdin.on('readable', () => {

    let input = process.stdin.read().toString().slice(0, -1); // remove \n
    if(input.toLowerCase() === "q"){
        process.exit(0);
    }
    //input = '490008660N'; //todo: remove once done testing
    let url = `https://api.tfl.gov.uk/StopPoint/${input}/Arrivals?app_id=${keys.appID}&app_key=${keys.appKey}`;
    request(url, (err, response, body) => {
        if(err) {
            return console.log(err);
        }
        // ids = JSON.parse(body).map(entry => entry.id);
        // console.log(ids);
        // lessIds = ids.splice(6);
        // console.log(ids);
        // console.log(JSON.parse(body).length);
        let nextBuses = JSON.parse(body);
        nextBuses.splice(5);
        //console.log(nextBuses);
        //console.log('body:', body);
        nextBuses = nextBuses.map(bus => ({
            route: bus.lineId,
            dest: bus.destinationName,
            ETA: moment(bus.expectedArrival)
        }));
        nextBuses.sort((b1, b2) => b1.ETA - b2.ETA);
        const now = moment();
        nextBuses.forEach(bus => {
            let timeToBus = Math.floor((bus.ETA - now) / 1000 / 60);
            console.log(`Bus number: ${bus.route}\nTowards: ${bus.dest}\nETA: ${timeToBus}min\n`);
        });

        console.log("please enter another stopID");
    });
});