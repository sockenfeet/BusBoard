function getBuses(param) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${param.elements[0].value}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            var response = JSON.parse(xhttp.responseText);
            var html;
            if (response.length === 0) {
                html = "<h2>No buses found nearby</h2>Is the postcode in London?";
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
            document.getElementById("results").innerHTML = "<h2>An error occurred</h2>See console for details";
            console.log(xhttp.responseText);
        }
    };
    xhttp.send();
};