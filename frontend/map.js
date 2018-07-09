var map;
var allMarkers;

function initMap() {
    const lond = {lat: 51.503399, lng: -0.127874};
    allMarkers = [];
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 18, center: lond}
    )
}

function setMarkers(stops) {
    allMarkers.forEach(marker => marker.setMap(null));
    allMarkers = stops.map(stop => new google.maps.Marker({
        position: {
            lat: stop.coord.lat,
            lng: stop.coord.lon
        },
        map: map,
        title: stop.name
    }));
    if (allMarkers.length !== 0) {
        var sum = {lat: 0, lng: 0};
        allMarkers.map(marker => marker.position).forEach(pos => {
            sum.lat += pos.lat();
            sum.lng += pos.lng();
        });
        var center = {
            lat: sum.lat / allMarkers.length,
            lng: sum.lng / allMarkers.length
        };
        console.log(center);
        map.setCenter(center);
    }
}