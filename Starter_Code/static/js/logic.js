var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
d3.json(queryURL).then(function(data) {
    console.log(data.features);

    var myMap = L.map("map", {
        center: [39.742043, -104.991531],
        zoom: 4.5
    });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    
    var markers = L.markerClusterGroup();

      // Loop through the data.
        for (var i = 0; i < data.features.length; i++) {
          // Set the data location property to a variable.
            var location = data.features[i].geometry;
  
          // Check for the location property.
            if (location) {
              // Add a new marker to the cluster group, and bind a popup.
              var marker = L.marker([location.coordinates[1], location.coordinates[0]]);
              markers.addLayer(marker);
            }
        }
    myMap.addLayer(markers);
});