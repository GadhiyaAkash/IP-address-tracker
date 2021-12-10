
var map = null;

function setMap(locationDetails) {

    var data = locationDetails ? 
        { 
            lat: locationDetails.lat, 
            lng: locationDetails.lng 
        } : { 
            lat: 22.995275, 
            lng: 72.662987 
        }
        var dataArray = [data.lat, data.lng];
    
    // Remove old map so new map can update
    if (map) {
        map.remove();    
    }

    //Render map in UI
    map = L.map('map').setView(dataArray, 13);

    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWthc2hnYWRoaXlhIiwiYSI6ImNrcnVmaXFjcDFiOTUycW8wdTJ0cTdnMmcifQ.11ldeMiY_ZO9gMahM310EA', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    // Add marker to map
    var marker = L.marker(dataArray)
        .addTo(map);
}

function setIPDetails(data) {
    document.getElementById("ip_address").innerHTML = data ? data.ip : '-';
    document.getElementById("ip_country").innerHTML = data ? data.location.country : '-';
    document.getElementById("ip_timezone").innerHTML = data ? data.location.timezone : '-';
    document.getElementById("ip_isp").innerHTML = data ? data.isp : '-';
}

$(document).ready(function(){
    setMap();
    setIPDetails();
});


function searchIp() {
    var IPValue = document.getElementById('ip-search').value;
    if (IPValue) {
        var ip = IPValue;
        var api_key = "at_27ZOpnMktpAwkEpB9j7WU3Ys1pTJH";
        $(function () {
            $.ajax({
                url: "https://geo.ipify.org/api/v1",
                data: { apiKey: api_key, ipAddress: ip },
                success: function (data) {
                    setIPDetails(data);
                    setMap(data.location)
                }
            });
        });
    }
}