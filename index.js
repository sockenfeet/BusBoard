const http = require('http');
const request = require('request');
const keys = require('./keys');
const moment = require('moment');

let stopID = '490008660N';


process.stdin.on('readable', () => {
    let input = process.stdin.read().toString().slice(0, -1); // remove \n
    input = '490008660N'; //todo: remove once done testing
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
        console.log(nextBuses.length);
        //console.log('body:', body);
    });
});

// https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_id=93d97c7c&app_key=c7263864d367c5d5138bf2d0e27d9704