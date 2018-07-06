const tflArrivals = require("./tflapi/arrivals");

let stopID = '490008660N';

console.log(`please enter a stopID: `);
process.stdin.on('readable', () => {

    let input = process.stdin.read().toString().slice(0, -1); // remove \n
    if (input.toLowerCase() === "q") {
        process.exit(0);
    }

    //input = '490008660N'; //todo: remove once done testing
    tflArrivals(input, nextBuses => nextBuses.forEach(bus =>
        console.log(`Bus number: ${bus.route}\nTowards: ${bus.destination}\nETA: ${bus.timeToStop}min\n`)
    ));

    console.log("please enter another stopID");
});