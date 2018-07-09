var map;
var allMarkers;

function initMap() {
    const lond = {lat: 51.503399, lng: -0.127874}
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: lond}
    )
}

function setMarkers(stops) {
    allMarkers.forEach(marker => marker.setMap(null));
    allMarkers = stops.map(stop => new google.maps.Marker({
        position: {
            lat: stop.coord.lat,
            lon: stop.coord.lon
        },
        map: map,
        title: stop.name
    }));
}