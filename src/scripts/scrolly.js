import mapboxgl from 'mapbox-gl';
import enterView from 'enter-view';
import { select } from 'd3-selection';

mapboxgl.accessToken =  'pk.eyJ1IjoidGFnZXN3b2NoZSIsImEiOiJjamp0cHc2ZTIwOWtiM3BxaDU3aG44endjIn0.X3Tgu7aJyY0t-95wu518fQ';

const map = new mapboxgl.Map({
    container: 'mapScrolly',
    style: 'mapbox://styles/tageswoche/cjjtq37gn01v32sqm5cv1004c',
    zoom: 13,
    center: [7.588576,47.555],
    scrollZoom      : false,
    boxZoom         : false,
    doubleClickZoom : false,
    touchZoom: false,
    touchZoomRotate: false,
    dragPan: false,
    dragRotate: false,
    interactive: false
});

const transition_time = 1000;

map.on('style.load', function () {
    let mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    mapCanvas.style.height = '100%';
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

    // map.addSource('export_15-16-17', {
    //     type: 'vector',
    //     url: 'mapbox://felixmichel.cjj5e2lgw052i31pryb6gbnal-19fbl'
    // });
    // map.addLayer({
    //     'id': 'export_15-16-17',
    //     'type': 'circle',
    //     'source': 'export_15-16-17',
    //     'source-layer': 'export_15-16-17',
    //     'layout': {
    //         'visibility': 'visible'
    //     },
    //     'paint': {
    //         'circle-opacity': 0,
    //         'circle-opacity-transition': {
    //             duration: transition_time
    //         },
    //         'circle-radius': 3,
    //         'circle-color': {
    //             property: 'severity_c',
    //             stops: [[1, '#B907E8'], [2, '#8808FF']]
    //         },
    //     },
    //     'source-layer': 'export_15-16-17'
    // });

    map.addSource('all_bikeaccidents', {
    type: 'vector',
    url: 'mapbox://felixmichel.cjkibbowh0znk2vqs3yr04986-07tcl'
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
            'circle-opacity': 0,
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

const layerIds = [ 'all_bikeaccidents', 'bike_hotspots_circles' ];

function changeOpacity(index) {

    switch (index) {
        case 0:
            map.setPaintProperty(layerIds[0], 'circle-opacity', 1);
            map.setFilter(layerIds[0], null);
            map.setFilter(layerIds[1], ['==', ['string', ['get', 'hotspot']], 'true']);
            map.setPaintProperty(layerIds[1], 'circle-opacity', 0);
            map.setPaintProperty(layerIds[1], 'circle-stroke-opacity', 0);
            // map.setFilter(layerIds[0], ['all']);
            // map.setFilter(layerIds[1], ['all']); 
            break;
        case 1:
            map.flyTo({center: [7.588576,47.555], zoom: 13});
            map.setPaintProperty(layerIds[1], 'circle-stroke-opacity', 1);
            map.setFilter(layerIds[0], ['all', ['==', ['number', ['get', 'hotspots']], 2], ['match', ['get', 'year'], [2015,2016,2017], true, false]]);
 
            // map.setPaintProperty(layerIds[0], 'circle-opacity', 0);
            // map.setFilter(layerIds[1], ['all']);
            // map.setPaintProperty(layerIds[1], 'circle-opacity', 1);
            break;

        case 2:
            map.flyTo({center: [7.574796, 47.551208], zoom: 15});
            break;

        case 3:
            map.flyTo({center: [7.602207, 47.541792], zoom: 15});
            break;

        case 4:
            map.flyTo({center: [7.581421, 47.557921], zoom: 15});
            map.setFilter(layerIds[1], ['==', ['string', ['get', 'hotspot']], 'true']);
            map.setFilter(layerIds[0], ['==', ['number', ['get', 'hotspots']], 2]);
            break;

        case 5:
            map.flyTo({center: [7.588576,47.555], zoom: 13});
            map.setFilter(layerIds[0], ['all', ['match', ['get', 'hotspots'], [1,2], true, false], ['match', ['get', 'year'], [2015,2016,2017], true, false]]);
            map.setPaintProperty(layerIds[2], 'circle-stroke-opacity', 1);
            map.setFilter(layerIds[1], ['match', ['get', 'hotspot'], ['true', 'false'], true, false]);

            break;

        case 6:
            if (window.innerWidth < 768) {
                map.flyTo({center: [7.592810,47.548527], zoom: 14});

            } else {
                map.flyTo({center: [7.586777,47.551106], zoom: 15});
            }
            
            break;

         case 7:
            if (window.innerWidth < 768) {
                map.flyTo({center: [7.580075,47.538210], zoom: 14});
            } else {
                map.flyTo({center: [7.571482,47.545036], zoom: 15});
            }
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

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
    // offset: [50, 10]
});

if (window.innerWidth < 768) {
    map.on('click', layerIds[0], function(e) {
    popup.remove();
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

} else {
    map.on('mouseenter', layerIds[0], function(e) {
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

}

init();

