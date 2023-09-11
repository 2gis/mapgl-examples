const map = new mapgl.Map('container', {
    center: [55.270872255787253, 25.196689173834102],
    zoom: 17.9,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    pitch: 45,
    rotation: 330,
    enableTrackResize: true,
    maxZoom: 20.7,
});

const plugin = new mapgl.GltfPlugin(map, {
    modelsLoadStrategy: 'waitAll',
    ambientLight: { color: '#ffffff', intencity: 3 },
    modelsBaseUrl: 'https://disk.2gis.com/digital-twin/models_s3/realty_ads/standpointtowers/',
    poiConfig: {
        primary: {
            fontSize: 14,
        },
        secondary: {
            fontSize: 14,
        },
    },
    hoverHighlight: {
        intencity: 0.1,
    },
});
const realtyScene = [
    {
        modelId: 'standpointtowers',
        coordinates: [
            55.27087225578725,
            25.196689173834102
        ],
        rotateX: 90,
        rotateY: -116.76399405643865,
        scale: 128.79829191413992,
        modelUrl: 'standpointtowers_center.glb',
        linkedIds: ['13933647002592567'],
        mapOptions: {
            center: [55.271321201282895, 25.196442258306178],
            pitch: 50.4,
            zoom: 18.52,
            rotation: -115.7,
        },
    },
    {
        modelId: 'standpointtowers2',
        coordinates: [
            55.27087225578725,
            25.196689173834102
        ],
        rotateX: 90,
        rotateY: -116.76399405643865,
        scale: 128.79829191413992,
        modelUrl: 'standpointtowers2.glb',
        linkedIds: ['13933647002601472'],
        mapOptions: {
            center: [55.27104661856671, 25.19654143333551],
            pitch: 45,
            zoom: 19,
            rotation: -173,
        },
        popupOptions: {
            coordinates: [55.271024122768324, 25.19693053802895],
            title: 'Apartments Tower B',
            description: 'Ready <br> Central A/C & Heating, Security, Concierge Service <br> Private: Garden, Gym, Pool ',
        },
        floors: [
            {
                id: '2',
                text: '2',
                modelUrl: 'standpointtowers4-2.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 17.8,
                    zoom: 20.8,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 10,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '3',
                text: '3',
                modelUrl: 'standpointtowers4-3.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 17.8,
                    zoom: 20.75,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 13,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '4',
                text: '4',
                modelUrl: 'standpointtowers4-4.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 14.8,
                    zoom: 20.7,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 16,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '5',
                text: '5',
                modelUrl: 'standpointtowers4-5.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 9.3,
                    zoom: 20.65,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 19,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '6',
                text: '6',
                modelUrl: 'standpointtowers4-6.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8.5,
                    zoom: 20.60,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 22,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '7',
                text: '7',
                modelUrl: 'standpointtowers4-7.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8.2,
                    zoom: 20.56,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 25,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '8',
                text: '8',
                modelUrl: 'standpointtowers4-8.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8,
                    zoom: 20.51,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 28,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '9',
                text: '9',
                modelUrl: 'standpointtowers4-9.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8,
                    zoom: 20.4,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 31,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '10',
                text: '10',
                modelUrl: 'standpointtowers4-10.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8,
                    zoom: 20.3,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 34,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '11',
                text: '11',
                modelUrl: 'standpointtowers4-11.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 8,
                    zoom: 20.2,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 37,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '12',
                text: '12',
                modelUrl: 'standpointtowers4-12.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 7.5,
                    zoom: 20.1,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 40,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '13',
                text: '13',
                modelUrl: 'standpointtowers4-13.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 7.0,
                    zoom: 20.1,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 43,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '14',
                text: '14',
                modelUrl: 'standpointtowers4-14.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 6.5,
                    zoom: 20.1,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 45,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '15',
                text: '15',
                modelUrl: 'standpointtowers4-15.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 6,
                    zoom: 20.1,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 48,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '16',
                text: '16',
                modelUrl: 'standpointtowers4-16.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 5.5,
                    zoom: 20.1,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 51,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '17',
                text: '17',
                modelUrl: 'standpointtowers4-17.glb',
                mapOptions: {
                    center: [55.27101659214413, 25.19692572574951],
                    pitch: 5.0,
                    zoom: 20.0,
                    rotation: 137.02588223579758,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 53,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27095943017267, 25.197085861856678],
                                label: '1 Bed\n323 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271011424317585, 25.19704189077632],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27086972852069, 25.196999662434976],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2711596091742, 25.196857840495],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710044354644, 25.19689784165797],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27109216906766, 25.196807837435273],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27114979328282, 25.196936631205745],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27094029099825, 25.19695530862026],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.271084685746885, 25.196991799213222],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        modelId: 'standpointtowers3',
        coordinates: [
            55.27087225578725,
            25.196689173834102
        ],
        rotateX: 90,
        rotateY: -116.76399405643865,
        scale: 128.79829191413992,
        modelUrl: 'standpointtowers3.glb',
        linkedIds: ['13933647002601471'],
        mapOptions: {
            center: [55.27125168787015, 25.196926809413966],
            pitch: 52,
            zoom: 18.7,
            rotation: -35.4,
        },
        popupOptions: {
            coordinates: [55.270872255787253, 25.196689173834102],
            title: 'Apartments Tower A',
            description: 'Ready <br> Central A/C & Heating, Security, Concierge Service <br> Private: Garden, Gym, Pool ',
        },
        floors: [
            {
                id: '112',
                text: '1-12',
                modelUrl: 'standpointtowers5-2.glb',
                mapOptions: {
                    center: [55.27084419010903, 25.19649935503182],
                    pitch: 9.2,
                    zoom: 19.97,
                    rotation: -12.398906380706755,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 50,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27068175220883, 25.19649320038519],
                                label: '2 Beds\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27077348188615, 25.19647327785033],
                                label: '2 Beds\n450 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27085214880376, 25.196467153234963],
                                label: '2 Beds\n400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27099580986241, 25.196472879809335],
                                label: '2 Beds\n450 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710647854107, 25.19641925181169],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270947692821274, 25.19636548566021],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27051955532713, 25.196424192744416],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270597030613025, 25.196393584814047],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27083715085102, 25.19635404369795],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270736638337546, 25.196362134415565],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27067601641181, 25.19638678843009],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27102002769878, 25.196363368779487],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '1320',
                text: '13-20',
                modelUrl: 'standpointtowers5-1.glb',
                mapOptions: {
                    center: [55.27084419010903, 25.19649935503182],
                    pitch: 9.2,
                    zoom: 19.8,
                    rotation: -12.398906380706755,
                },
                poiGroups: [
                    {
                        id: 1111,
                        type: 'primary',
                        minZoom: 18.9,
                        elevation: 66,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [55.27068175220883, 25.19649320038519],
                                label: '2 Beds\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27077348188615, 25.19647327785033],
                                label: '2 Beds\n450 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27085214880376, 25.196467153234963],
                                label: '2 Beds\n400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27099580986241, 25.196472879809335],
                                label: '2 Beds\n450 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.2710647854107, 25.19641925181169],
                                label: '1 Bed\n360 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270947692821274, 25.19636548566021],
                                label: '1 Bed\n330 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27051955532713, 25.196424192744416],
                                label: '1 Bed\n690 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270597030613025, 25.196393584814047],
                                label: '1 Bed\n600 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27083715085102, 25.19635404369795],
                                label: '4 Beds\n1800 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.270736638337546, 25.196362134415565],
                                label: '2 Beds\n1500 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27067601641181, 25.19638678843009],
                                label: '2 Beds\n1215 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                            {
                                coordinates: [55.27102002769878, 25.196363368779487],
                                label: '3 Beds\n2400 sqft',
                                userData: {
                                    url: 'https://dev.urbi.ae/',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        modelId: 'standpointtowers6',
        coordinates: [
            55.270675867795944,
            25.19714112613724
        ],
        rotateX: 90,
        rotateY: -122.50752437711678,
        scale: 120.95040320924127,
        modelUrl: 'standpointtowers6.glb',
        linkedIds: ['13933647002603034'],
        mapOptions: {
            center: [55.270872255787253, 25.196689173834102],
            pitch: 40,
            zoom: 19,
            rotation: -41.4,
        },
        floors: [
        ],
    },
];
plugin.addRealtyScene(realtyScene);