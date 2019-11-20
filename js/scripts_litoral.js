
////////////////////////////////////MAPA DE LITORAL/////////////////////////////////////

// Creación de un mapa de Leaflet
var map = L.map("mapid_litoral");
// Centro del mapa y nivel de acercamiento
var guanacaste = L.latLng([10.557188, -85.372099]);
var zoomLevel = 9;

// Definición de la vista del mapa
map.setView(guanacaste, zoomLevel);

// Adición de capa base
esriLayer = L.tileLayer.provider("Esri.WorldImagery",{attribution: false}).addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik",{attribution: false}).addTo(map);


var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer,   
};

var overlayMaps = {};

/////CONTROLES/////

var control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topleft'}).addTo(map);
L.control.scale({position:'bottomleft', imperial:false}).addTo(map);

$.getJSON("geojason/Estructura.geojson", function(geodata) {
	var layer_geojson_Estructura = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#5B2C6F", 'weight': 2}
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_Estructura, 'Estructuras');
});

$.getJSON("guanacaste.geojson", function(geodata) {
	var layer_geojson_guanacaste = L.geoJson(geodata, {
		style: function(feature) {return {'color': "#943126"}}}).addTo(map);
	control_layers.addOverlay(layer_geojson_guanacaste, 'guanacaste');
});