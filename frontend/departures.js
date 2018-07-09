var postcode = undefined;
var interval;

function submitPostcode(form) {
    if (interval) {
        clearInterval(interval);
    }
    postcode = form.elements[0].value;
    interval = setInterval(getBuses, 30000);
    getBuses();
}

function getBuses() {
    if(!postcode) {
        clearInterval(interval);
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${postcode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        var success = true;
        if (xhttp.status === 200) {
            var response = JSON.parse(xhttp.responseText);
            var html;
            if (response.length === 0) {
                success = false;
                html = "<div class='warning'><h2>No bus stops found nearby</h2>Is the postcode in London?</div>";
            } else {
                html = "<h2>Results</h2>";
                response.forEach(function (stop) {
                    html += `<h3>${stop.stop.name}</h3>`;
                    if (stop.buses.length === 0) {
                        html += "No buses found &#128542";
                    } else {
                        html += "<ul>";
                        stop.buses.forEach(function (bus) {
                            html += `<li>${bus.timeToStop} minute${bus.timeToStop === 1 ? "" : "s"}: ${bus.route} to ${bus.destination}</li>`
                        });
                        html += "</ul>";
                    }
                });
            }
            document.getElementById("results").innerHTML = html;
        } else {
            success = false;
            document.getElementById("results").innerHTML = "<div class='error'><h2>An error occurred</h2>See console for details</div>";
            console.warn(xhttp.responseText);
        }
        if(!success) {
            postcode = undefined;
        }
    };
    xhttp.send();
}