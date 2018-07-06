const tflArrivals = require("./tflapi/arrivals");
const post = require("./postcodeapi/latlon");
const radius = require("./tflapi/radius");

console.log(`please enter a postcode: `);
process.stdin.on('readable', () => {
    let input = process.stdin.read().toString().slice(0, -1); // remove \n
    if (input.toLowerCase() === "q") {
        process.exit(0);
    }

    post(input, coord =>
        radius(coord, nearestStops => {
            nearestStops.forEach((stop, stopIndex) =>
                tflArrivals(stop.id, nextBuses => {
                    console.log(`Stop \"${stop.name}\" ${Math.round(stop.distance)}m away`);
                    nextBuses.forEach((bus, busIndex) => {
                            console.log(`- Bus ${bus.route}\n  Towards: ${bus.destination}\n  ETA: ${bus.timeToStop}min\n`);
                            if (stopIndex === nearestStops.length - 1 && busIndex === nextBuses.length - 1) {
                                console.log("please enter another postcode or \"q\" to exit");
                            }
                        }
                    );
                    if(nextBuses.length === 0) {
                        console.log("  No buses found")
                    }
                    console.log("");
                })
            );
            if (nearestStops.length === 0) {
                console.log("No stops found, please enter a _London_ Postcode or \"q\" to exit");
            }
        })
    );
});