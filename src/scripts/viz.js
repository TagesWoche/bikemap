import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { select, selectAll } from 'd3-selection';

// mapboxgl.accessToken =  'pk.eyJ1IjoiZmVsaXhtaWNoZWwiLCJhIjoiZWZrazRjOCJ9.62fkOEqGMxFxJZPJuo2iIQ'; Felix Schlüssel
mapboxgl.accessToken =  'pk.eyJ1IjoidGFnZXN3b2NoZSIsImEiOiJjamp0cHc2ZTIwOWtiM3BxaDU3aG44endjIn0.X3Tgu7aJyY0t-95wu518fQ'; // TagesWoche Schlüssel

// mapboxgl.accessToken = 'pk.eyJ1IjoiYmVybGluZXJtb3JnZW5wb3N0IiwiYSI6Ik93Q3pCbWsifQ.-e0ddIaG2WuJdsA-TLeX5A'; //Berlin Morgenpost

var filterObject = {
    'severity': ['Unfall mit Leichtverletzten', 'Unfall mit Schwerverletzten', 'Unfall mit Getöteten'], 
    'accidentype': 'Alle Unfälle',
    'day': ['Wochentag', 'Wochenende'],
    'daytime': ['morgens', 'mittags', 'abends', 'nachts'],
    'year': 'Alle Jahre'
};


const accidenttypes = ['Alle Unfälle', 'Parkierunfall', 'Einbiegeunfall', 'Schleuder- oder Selbstunfall', 'Tierunfall', 'Überholunfall oder Fahrstreifenwechsel', 'Abbiegeunfall', 'Auffahrunfall', 'Frontalkollision', 'Überqueren der Fahrbahn', 'Fussgängerunfall', 'Andere'];
const yearArray = ['Alle Jahre', 2011, 2012, 2013, 2014, 2015, 2016, 2017];
const accidenttypeMenu = select("#accidenttypeMenu");
const yearMenu = select("#years");


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
});

yearMenu.append("select").selectAll("option")
    .data(yearArray).enter().append("option")
    .attr('value', d => d )
    .text(d => d );

yearMenu.on('change', function() {
    let selectedYear = select(this)
        .select("select")
        .property("value");

    if(selectedYear != 'Alle Jahre')  {
        filterObject.year = parseFloat(selectedYear);
    } else {
        filterObject.year = selectedYear;
    }

    updateFilters();
    console.log(filterObject);
});



const severity = selectAll("input[name='severity']").on("change", function() {
    var index = filterObject.severity.indexOf(this.value);
    if (index > -1) {
        filterObject.severity.splice(index, 1);
    } else {
        filterObject.severity.push(this.value);
    }

    updateFilters();

});

const day = selectAll("input[name='day']").on("change", function() {
    var index = filterObject.day.indexOf(this.value);
    if (index > -1) {
        filterObject.day.splice(index, 1);
    } else {
        filterObject.day.push(this.value);
    }

    updateFilters();

});

const daytime = selectAll("input[name='daytime']").on("change", function() {
    var index = filterObject.daytime.indexOf(this.value);
    if (index > -1) {
        filterObject.daytime.splice(index, 1);
    } else {
        filterObject.daytime.push(this.value);
    }

    updateFilters();

});

const map = new mapboxgl.Map({
    container: 'mapViz',
    style: 'mapbox://styles/tageswoche/cjjtq37gn01v32sqm5cv1004c',
    // style: 'mapbox://styles/berlinermorgenpost/cjgqes6dr007r2rsbql0cy3my', MOPO
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

    map.addSource('all_bikeaccidents', {
    type: 'vector',
    url: 'mapbox://felixmichel.cjk142efq0ror2vrk7avo49r6-7ap71'
    });
    map.addLayer({
        'id': 'all_bikeaccidents',
        'type': 'circle',
        'source': 'all_bikeaccidents',
        'source-layer': 'all_bikeaccidents',
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
                stops: [['Unfall mit Leichtverletzten', '#35FDFF'], ['Unfall mit Schwerverletzten', '#43d722'], ['Unfall mit Getöteten', '#e60000']]
            },
            'circle-blur': 1
        },
        'source-layer': 'all_bikeaccidents'
    });
});

const layerIds = [ 'all_bikeaccidents', 'export_15-16-17', 'bike_hotspots_circles' ];

function updateFilters() {
    let accidentTypeFilter;
    let severityFilter;
    let dayFilter;
    let dayTimeFilter;
    let yearFilter;

    if(filterObject.daytime.length > 0) {
        dayTimeFilter = ['match', ['get', 'timefilter'], filterObject.daytime, true, false];
    } else {
        dayTimeFilter = ['==', ['string', ['get', 'timefilter']], 'none'];
    }

    if(filterObject.severity.length > 0) {
        severityFilter = ['match', ['get', 'severity'], filterObject.severity, true, false];
    } else {
        severityFilter = ['==', ['string', ['get', 'severity']], 'none'];
    }

    if(filterObject.day.length > 0) {
        dayFilter = ['match', ['get', 'weekyday'], filterObject.day, true, false];
    } else {
        dayFilter = ['==', ['string', ['get', 'weekyday']], 'none'];
    }

    if(filterObject.accidentype == 'Alle Unfälle') {
        accidentTypeFilter = ['!=', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    } else {
        accidentTypeFilter = ['==', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    }

    if(filterObject.year == 'Alle Jahre') {
        yearFilter = ['!=', ['number', ['get', 'year']], 1];
    } else {
        yearFilter = ['==', ['number', ['get', 'year']], filterObject.year];
    }

    map.setFilter(layerIds[0], ['all', severityFilter, accidentTypeFilter, dayFilter, dayTimeFilter, yearFilter]);
}

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
    // offset: [50, 10]
});

map.on('mouseenter', layerIds[0], function(e) {
    console.log(e.features[0].properties);
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();

    var accidenttype = e.features[0].properties.accidenttype;
    var severity = e.features[0].properties.severity;
    var time = e.features[0].properties.day.trim() + ', ' + e.features[0].properties.time.trim() + ', ' + e.features[0].properties.year;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML('<h2>' + severity + '</h2><p class="popup-accidenttype">' + accidenttype + '</p><p class="popup-time">' + time + '</p>')
        .addTo(map);
});


map.on('mouseleave', layerIds[0], function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
