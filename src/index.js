const tflArrivals = require("./tflapi/arrivals");
const post = require("./postcodeapi/latlon");
const radius = require("./tflapi/radius");
const rl = require('readline-sync');

let print = stops => stops.forEach(stop => {
    console.log(`Stop \"${stop.stop.name}\" ${Math.round(stop.stop.distance)}m away`);
    stop.buses.forEach(bus => {
        console.log(`- Bus ${bus.route}\n  Towards: ${bus.destination}\n  ETA: ${bus.timeToStop}min\n`);
    })
});

let input = rl.question("Enter a postcode or \"q\" to cancel\n");
Promise.resolve(input)
    .then(input => input === "q" ? process.exit(0) : input)
    .then(post)
    .then(radius)
    .then(stops => Promise.all(stops.map(tflArrivals)))
    .then(print)
    .catch(e => console.warn(e));