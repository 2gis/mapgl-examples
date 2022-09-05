const map = new mapgl.Map('map', {
    center: [55.14723, 25.08854],
    zoom: 17,
    pitch: 30,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

// Add new foo attibutes to 2GIS building data
map.getDefaultSource().setFeatureStateMap({
    13933647002600966: {
        foo: 1,
    },
    '70030076160644458': {
        foo: 2,
    },
    '70030076274107483': {
        foo: 3,
    },
    13933647002541366: {
        foo: 4,
    },
    '13933647002541481': {
        foo: 5,
    },
    13933647002539914: {
        foo: 6,
    },
    13933647002539460: {
        foo: 7,
    },
    '13933647002538895': {
        foo: 8,
    },
    '13933647002593717': {
        foo: 9,
    },
    '70030076429567879': {
        foo: 10,
    },
    '70000001055925429': {
        foo: 11,
    },
    13933647002944694: {
        foo: 12,
    },
    13933647002538332: {
        foo: 13,
    },
    '13933647002539065': {
        foo: 14,
    },
    '13933647002539915': {
        foo: 15,
    },
    13933647002592246: {
        foo: 16,
    },
    13933647002538570: {
        foo: 17,
    },
    13933647002541364: {
        foo: 18,
    },
    13933647002591590: {
        foo: 19,
    },
    '13933647002539913': {
        foo: 20,
    },
    13933647002605462: {
        foo: 21,
    },
    13933647002539344: {
        foo: 22,
    },
    '13933647002592245': {
        foo: 23,
    },
    '13933647002541367': {
        foo: 24,
    },
    '13933647050752911': {
        foo: 25,
    },
    13933647002605504: {
        foo: 26,
    },
    13933647002593670: {
        foo: 27,
    },
    '13933647002538185': {
        foo: 28,
    },
    '13933647002600971': {
        foo: 29,
    },
});

// Change map style to get building colors from featureState
map.once('styleload', () => {
    map.addLayer({
        id: 'my color house dwelling',
        type: 'polygonExtrusion',
        style: {
            topColor: [
                'interpolate',
                ['linear'],
                ['featureState', 'foo'],
                0,
                '#ff0000cc',
                30,
                '#00ff00cc',
            ],
            sideColor: [
                'interpolate',
                ['linear'],
                ['featureState', 'foo'],
                0,
                '#ff0000cc',
                30,
                '#00ff00cc',
            ],
            strokeColor: '#000000',
            strokeWidth: 0.5,
        },
        filter: [
            'all',
            ['match', ['featureState', 'foo'], [null], false, true],
            [
                'match',
                ['get', 'db_sublayer'],
                [
                    'Dwelling_house',
                    'New_house',
                    'Administrative_house',
                    'Technical_house',
                    'Floor_plan_house',
                    'Private_house',
                    'Preschool_house',
                    'School_house',
                    'Underground_house',
                ],
                true,
                false,
            ],
        ],
        minzoom: 16,
    });

    // Remove 3D models layer from style and add new one
    map.removeLayer('843132');
    map.addLayer({
        id: 'color 3D models',
        type: 'buildingModel',
        style: {
            color: [
                'interpolate',
                ['linear'],
                ['featureState', 'foo'],
                0,
                '#ff0000cc',
                30,
                '#00ff00cc',
            ],
            strokeColor: '#000000',
            strokeWidth: 0.1,
        },
        minzoom: 16,
        filter: [
            'all',
            ['match', ['featureState', 'foo'], [null], false, true],
            ['match', ['get', 'db_sublayer'], ['Building_model'], true, false],
        ],
    });
});
