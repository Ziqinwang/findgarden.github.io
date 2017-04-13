// Global Variables

var myShape ,
    myRectangles=[];

// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: false,
    marker: false,
    rectangle: false,
  }
});
map.addControl(drawControl);

var a=[];




//draw the map
map.on('draw:created', function (e) {
    //clear the draw item
    _.each(myRectangles, function(layer){
      map.removeLayer(layer);
    });
    var type = e.layerType; // The type of shape
    var layer = e.layer; // The Leaflet layer for the shape
    //console.log(layer);
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    myRectangles.push(layer);
    _.last(myRectangles).addTo(map);
    //console.log(layer._latlngs);

    var tempArray = [];
    for (var i=0; i < e.layer._latlngs[0].length; i++) {
        var lat = e.layer._latlngs[0][i].lat;
        var lng = e.layer._latlngs[0][i].lng;
        tempArray.push([lng, lat]);
     }
     //console.log(tempArray);

    function judge(a){
      var ra = [a.lng,a.lat];
      //var test = inside(ra, points);
      var test = inside(ra, tempArray);
      //console.log(a.lat);
      if (test===true){return 1;}
      else if(test===false){return 0.1;}
    }

    function geojsonMarkerOptions(e){
      return {
        radius: 3,
        fillColor: "#ff7800",
        stroke:false,
        fillOpacity: judge(e)
      };
    }

    $.ajax(gardenraw).done(function(data){
      resetMap();
      var parsedData = JSON.parse(data);
      L.geoJSON(parsedData,  {
        pointToLayer: function (feature, latlng) {
          //console.log(latlng);
          a.push(latlng);
          return L.circleMarker(latlng, geojsonMarkerOptions(latlng));
        }
      }).addTo(map);
    });


});
