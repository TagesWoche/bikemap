import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import enterView from 'enter-view';
import { select } from 'd3-selection';

// mapboxgl.accessToken =  'pk.eyJ1IjoiZmVsaXhtaWNoZWwiLCJhIjoiZWZrazRjOCJ9.62fkOEqGMxFxJZPJuo2iIQ';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVybGluZXJtb3JnZW5wb3N0IiwiYSI6Ik93Q3pCbWsifQ.-e0ddIaG2WuJdsA-TLeX5A';

const map = new mapboxgl.Map({
    container: 'mapScrolly',
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
    map.addSource('bike_hotspots_circles', {
        type: 'vector',
        url: 'mapbox://felixmichel.cjj41vxom1uqz2xsc4wvw6fcj-0ctwf'
    });
    map.addLayer({
        'id': 'bike_hotspots_circles',
        'type': 'circle',
        'source': 'bike_hotspots_circles',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 20,
            'circle-opacity': 0,
            'circle-opacity-transition': {
                duration: transition_time
            },
            'circle-stroke-color': {
                property: 'hotspot',
                type: 'categorical',
                stops: [['true', '#ff05e1'], ['false', '#14CCBD']]
            },
            'circle-stroke-width': 2,
            'circle-stroke-opacity': 0,
        },
        'source-layer': 'bike_hotspots_circles'
    });

    map.addSource('export_15-16-17', {
        type: 'vector',
        url: 'mapbox://felixmichel.cjj5e2lgw052i31pryb6gbnal-19fbl'
    });
    map.addLayer({
        'id': 'export_15-16-17',
        'type': 'circle',
        'source': 'export_15-16-17',
        'source-layer': 'export_15-16-17',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-opacity': 0,
            'circle-opacity-transition': {
                duration: transition_time
            },
            'circle-radius': 3,
            'circle-color': {
                property: 'severity_c',
                stops: [[1, '#B907E8'], [2, '#8808FF']]
            },
        },
        'source-layer': 'export_15-16-17'
    });

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
            'circle-opacity': 0,
            'circle-opacity-transition': {
                duration: transition_time
            },
            'circle-radius': 6,
            'circle-color': {
                property: 'severity',
                type: 'categorical',
                stops: [['Unfall mit Leichtverletzten', '#ff05e1'], ['Unfall mit Schwerverletzten', '#14CCBD']]
            },
            'circle-blur': 1
        },
        'source-layer': 'all_accidents'
    });
});

const layerIds = [ 'all_accidents', 'export_15-16-17', 'bike_hotspots_circles' ];

function changeOpacity(index) {

    if(map.loaded() == false) {
        return;
    }

    switch (index) {
        case 0:
            // map.setFilter(layerIds[0], ['==', ['string', ['get', 'accidenttype']], 'Parkierunfall']);
            map.setPaintProperty(layerIds[0], 'circle-opacity', 1);
            map.setPaintProperty(layerIds[1], 'circle-opacity', 0);
            map.setPaintProperty(layerIds[2], 'circle-stroke-opacity', 1);
            break;
        case 1:
            map.setPaintProperty(layerIds[0], 'circle-opacity', 0);
            map.setFilter(layerIds[1], ['all']);
            map.flyTo({center: [7.574796, 47.551208], zoom: 15});
            map.setPaintProperty(layerIds[1], 'circle-opacity', 1);
            break;

    }
};

const container = select('#scrolly-overlay');
const stepSel = container.selectAll('.step');


function init() {

  enterView({
    selector: stepSel.nodes(),
    offset: 0.1,
    enter: el => {
      const index = +select(el).attr('data-index');
      changeOpacity(index);
    },
    exit: el => {
      let index = +select(el).attr('data-index');
      index = Math.max(0, index - 1);
      changeOpacity(index);
    }
  });
}

init();