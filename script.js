var firstTime = true;
// call the map     (map name)      latitude longitude zoomLevel
const mymap = L.map('cbersMap').setView([0, 0], 2);

//making a map and tiles
const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


//make a marker with a custom icon
const cbicon = L.icon({
        iconUrl: 'icon.png',
        iconSize: [90, 50],
        iconAnchor: [25, 16],
        popupAnchor: [-3, -76],
});


//create a marker
const marker = L.marker([0, 0], { icon: cbicon }).addTo(mymap);
const api_url_C = 'https://www.n2yo.com/rest/v1/satellite/positions/40336/-22.37083/-41.78694/0/1/&apiKey={YOUR API KEY}';


async function getData() {

        const response = await fetch(api_url_C);
        const data = await response.json();

        var latitude = data.positions[0].satlatitude;
        var longitude = data.positions[0].satlongitude;


        //L.marker([latitude, longitude]).addTo(mymap);
        marker.setLatLng([latitude, longitude]);
        if (firstTime) {
                mymap.setView([latitude, longitude], 3);
                firstTime = false;
        }

        document.getElementById('lat').textContent = latitude.toFixed(2);
        document.getElementById('lon').textContent = longitude.toFixed(2);

        console.log(data.positions[0].satlatitude);
        console.log(data.positions[0].satlongitude);

}

getData();
setInterval(getData, 1000);
