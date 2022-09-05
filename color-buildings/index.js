const map = new mapgl.Map('map', {
    center: [55.14723, 25.08854],
    zoom: 17,
    pitch: 30,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

// Add colors to building IDs as featureState color attribute
map.getDefaultSource().setFeatureStateMap({
    13933647002600966: {
        color: '#ac0c44cc',
    },
    '70030076160644458': {
        color: '#7fad22cc',
    },
    '70030076274107483': {
        color: '#7e6f49cc',
    },
    13933647002541366: {
        color: '#882a6acc',
    },
    '13933647002541481': {
        color: '#5249c4cc',
    },
    13933647002539914: {
        color: '#2746a2cc',
    },
    13933647002539460: {
        color: '#f0d77ecc',
    },
    '13933647002538895': {
        color: '#db147fcc',
    },
    '13933647002593717': {
        color: '#0c8357cc',
    },
    '70030076429567879': {
        color: '#bfe88ccc',
    },
    '70000001055925429': {
        color: '#3b4108cc',
    },
    13933647002944694: {
        color: '#85d395cc',
    },
    13933647002538332: {
        color: '#efc699cc',
    },
    '13933647002539065': {
        color: '#d5a518cc',
    },
    '13933647002539915': {
        color: '#37b9b2cc',
    },
    13933647002592246: {
        color: '#e380a4cc',
    },
    13933647002538570: {
        color: '#29ba92cc',
    },
    13933647002541364: {
        color: '#6dfcbccc',
    },
    13933647002591590: {
        color: '#0872b9cc',
    },
    '13933647002539913': {
        color: '#5c6b68cc',
    },
    13933647002605462: {
        color: '#dac0c1cc',
    },
    13933647002539344: {
        color: '#130640cc',
    },
    '13933647002592245': {
        color: '#0cd631cc',
    },
    '13933647002541367': {
        color: '#464d18cc',
    },
    '13933647050752911': {
        color: '#30da09cc',
    },
    13933647002605504: {
        color: '#daecc7cc',
    },
    13933647002593670: {
        color: '#903bd5cc',
    },
    '13933647002538185': {
        color: '#82548ccc',
    },
    '13933647002600971': {
        color: '#c5f146cc',
    },
});

// Change map style to get building colors from featureState
map.once('styleload', () => {
    map.addLayer({
        id: 'my color house dwelling',
        type: 'polygonExtrusion',
        style: {
            topColor: ['to-color', ['featureState', 'color']],
            sideColor: ['to-color', ['featureState', 'color']],
            strokeColor: '#000000',
            strokeWidth: 0.5,
        },
        filter: [
            'all',
            ['match', ['featureState', 'color'], [null], false, true],
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
            color: ['to-color', ['featureState', 'color']],
            strokeColor: '#000000',
            strokeWidth: 0.1,
        },
        minzoom: 16,
        filter: [
            'all',
            ['match', ['featureState', 'color'], [null], false, true],
            ['match', ['get', 'db_sublayer'], ['Building_model'], true, false],
        ],
    });
});
