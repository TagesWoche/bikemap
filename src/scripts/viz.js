import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { select, selectAll } from 'd3-selection';

// mapboxgl.accessToken =  'pk.eyJ1IjoiZmVsaXhtaWNoZWwiLCJhIjoiZWZrazRjOCJ9.62fkOEqGMxFxJZPJuo2iIQ'; Felix Schlüssel
mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN3b2NoZSIsImEiOiJjamp0cHc2ZTIwOWtiM3BxaDU3aG44endjIn0.X3Tgu7aJyY0t-95wu518fQ'; //Berlin Morgenpost

var filterObject = {'severity': 'all', 'accidentype': 'Alle Unfälle' };

// Create a dropdown
const accidenttypes = ['Alle Unfälle', 'Parkierunfall', 'Einbiegeunfall', 'Abbiegeunfall'];

const accidenttypeMenu = select("#accidenttypeMenu");

accidenttypeMenu.append("select").selectAll("option")
    .data(accidenttypes).enter().append("option")
    .attr('value', d => d )
    .text(d => d );

accidenttypeMenu.on('change', function() {
    let selectedAccident = select(this)
        .select("select")
        .property("value");

    filterObject.accidentype = selectedAccident;
    updateFilters();
    console.log(filterObject);

    });

const accidentDay = selectAll("input[name='accidentday']").on("change", function() {
    console.log(this.value);
});

const severity = selectAll("input[name='severity']").on("change", function() {
    filterObject.severity = this.value;
    updateFilters();
    console.log(filterObject);
});

const map = new mapboxgl.Map({
    container: 'mapViz',
    style: 'mapbox://styles/berlinermorgenpost/cjgqes6dr007r2rsbql0cy3my',
    zoom: 13,
    center: [7.588576,47.559648],
    scrollZoom      : false,
    boxZoom         : false,
    doubleClickZoom : false
});

const transition_time = 1000;

map.on('style.load', function () {
    let mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    mapCanvas.style.height = '100vh';
    map.resize();

    map.addSource('all_accidents', {
    type: 'vector',
    url: 'mapbox://felixmichel.cjj5m8gj406u82qt9qo5gwrzh-2q5e0'
    });
    map.addLayer({
        'id': 'all_accidents',
        'type': 'circle',
        'source': 'all_accidents',
        'source-layer': 'all_accidents',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-opacity': 1,
            'circle-opacity-transition': {
                duration: transition_time
            },
            'circle-radius': 6,
            'circle-color': {
                property: 'severity',
                type: 'categorical',
                stops: [['Unfall mit Leichtverletzten', '#35FDFF'], ['Unfall mit Schwerverletzten', '#FF8135'], ['Unfall mit Getöteten', '#B24F13']]
            },
            'circle-blur': 1
        },
        'source-layer': 'all_accidents'
    });
});

const layerIds = [ 'all_accidents', 'export_15-16-17', 'bike_hotspots_circles' ];

function updateFilters() {
    let severityFilter;
    let accidentTypeFilter;

    if(filterObject.severity == 'all') {
        severityFilter = ['!=', ['string', ['get', 'severity']], filterObject.severity];
    } else {
        severityFilter = ['==', ['string', ['get', 'severity']], filterObject.severity];
    }

    if(filterObject.accidentype == 'Alle Unfälle') {
        accidentTypeFilter = ['!=', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    } else {
        accidentTypeFilter = ['==', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    }

    map.setFilter(layerIds[0], ['all', severityFilter, accidentTypeFilter]);

}

function filterbyAccidenttype(accident) {
    if(accident == 'Alle Unfälle') {
        map.setFilter(layerIds[0], ['all']);
    } else {
        map.setFilter(layerIds[0], ['==', ['string', ['get', 'accidenttype']], accident]);
    }
};

function filterbySeverity(accident) {
    if(accident == 'all') {
        map.setFilter(layerIds[0], ['all']);
    } else {
        map.setFilter(layerIds[0], ['==', ['string', ['get', 'severity']], accident]);
    }
    
};