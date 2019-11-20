
////////////////////////////////////MAPA DE LITORAL/////////////////////////////////////

function updateOpacity() {
	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
	temperaturaLayer.setOpacity(document.getElementById("sld-opacity").value);
}


// Creación de un mapa de Leaflet
var map = L.map("mapid");
// Centro del mapa y nivel de acercamiento
var guanacaste = L.latLng([10.557188, -85.372099]);
var zoomLevel = 9;

// Definición de la vista del mapa
map.setView(guanacaste, zoomLevel);


/* var temperaturaLayer = L.imageOverlay("Temperatura.png", 
	[[11.2197734290000000, -85.9790724540000042], 
	[8.0364413690000003, -82.5540738239999996]], 
	{opacity:0.5}
).addTo(map); */

var temperaturaLayer = L.imageOverlay("bio1_cr.png", 
	[[11.2197734290000000, -85.9790724540000042], 
	[8.0364413690000003, -82.5540738239999996]], 
	{opacity:0.5}
).addTo(map);

// Adición de capa base
esriLayer = L.tileLayer.provider("Esri.WorldImagery",{attribution: false}).addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik",{attribution: false}).addTo(map);


var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer,   
};

var overlayMaps = {};



var control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topleft'}).addTo(map);
L.control.scale({position:'bottomleft', imperial:false}).addTo(map);

$.getJSON("geojason/ESTACIONES.geojson", function(geodata) {
	var layer_geojson_ESTACIONES = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#5B2C6F", 'weight': 2}
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_ESTACIONES, 'ESTACIONES');
});

