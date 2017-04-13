//set basemap
var map = L.map('map',{
          center:[40.743395, -73.993251],
          zoom: 11
        });

titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
           maxZoom: 18,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);

//load the original dataset
var gardenraw ='https://gist.githubusercontent.com/Ziqinwang/1d74b9a1bf1325b2435bf1ec70e3e6ca/raw/4bc038f58bc68349f8cce013fc2ea826398d7bee/m_12_point.json',
    gardendata = [];

var resetMap = function(){
 map.eachLayer(function (layer) {
   //console.log(layer);
    if (layer != titleLayer ) {
     map.removeLayer(layer);
    }
 });
};

var inside = function(point,vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};



// $(document).ready(function() {
//
//   function inside(point, vs) {
//       var x = point[0], y = point[1];
//       var inside = false;
//       for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
//           var xi = vs[i][0], yi = vs[i][1];
//           var xj = vs[j][0], yj = vs[j][1];
//           var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//           if (intersect) inside = !inside;
//       }
//       return inside;
//   }
//
//   points = [
//     [-73.98433685302736,40.76091081214379],
//     [-74.00493621826173,40.75310895587201],
//     [-73.98365020751955,40.7429651739036]
//   ];
//
//   var judge = function(a){
//     var ra = [a.lng,a.lat];
//     //var test = inside(ra, points);
//     var test = inside(ra, poly);
//     //console.log(a.lat);
//     if (test===true){return 1;}
//     else if(test===false){return 0.1;}
//   };
//   // var judge = function(){
//   //   if (Math.random()>0.5){
//   //     return 1;}
//   //   else {return 0.1;}
//   // }
//
//   var geojsonMarkerOptions =function(e){
//     return {
//       radius: 3,
//       fillColor: "#ff7800",
//       stroke:false,
//       fillOpacity: judge(e)
//       //fillOpacity: judge()
//     }
//   };
//
//
//   $.ajax(gardenraw).done(function(data){
//     var parsedData = JSON.parse(data);
//     L.geoJSON(parsedData,  {
//       pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions(latlng))
//       }
//     }).addTo(map);
//   });
//
// });
