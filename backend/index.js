const tflArrivals = require("./tflapi/arrivals");
const post = require("./postcodeapi/latlon");
const radius = require("./tflapi/radius");
const express = require('express');

const app = express();
app.use(express.static('frontend'));
app.get('/departureBoards', (req, res) => {
    Promise.resolve(req.query.postcode)
        .then(post)
        .then(radius)
        .then(stops => Promise.all(stops.map(tflArrivals)))
        .then(str => res.send(str))
        .catch(e => {
            console.warn(e);
            res.status(418);
            res.send(e.message);
        });
});

app.listen(3000);