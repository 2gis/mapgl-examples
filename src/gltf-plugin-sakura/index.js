const map = new mapgl.Map('container', {
    center: [82.93569713407153, 55.02512834592805],
    zoom: 18.25,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    pitch: 53,
    rotation: 73,
    enableTrackResize: true,
    maxZoom: 21,
});

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

function waitIdle() {
    return new Promise((resolve) => {
        map.once('idle', resolve);
    });
}

async function runScenario(scenario) {
    for (const part of scenario) {
        // console.log(part);
        const duration = part.duration || 0;
        if (part.zoom !== undefined) {
            const params = {
                duration,
                animateHeight: true,
            };
            if (part.zoomEasing) {
                params.easing = part.zoomEasing;
            }
            map.setZoom(part.zoom, params);
        }
        if (part.pitch !== undefined) {
            const params = {
                duration,
            };
            if (part.pitchEasing) {
                params.easing = part.pitchEasing;
            }
            map.setPitch(part.pitch, params);
        }
        if (part.snowIntensity !== undefined) {
            const intensity = part.snowIntensity;
            snow.setOptions({
                enabled: intensity > 0,
                particleNumber: intensity * 1000,
                velocityZ: 500 + intensity * 7,
                velocityX: intensity * 4,
                dispersion: intensity,
            })
        }
        if (part.center) {
            const params = {
                duration,
            };
            if (part.centerEasing) {
                params.easing = part.centerEasing;
            }
            map.setCenter(part.center, params);
        }
        if (part.rotation !== undefined) {
            const params = {
                duration,
            };
            if (part.rotationEasing) {
                params.easing = part.rotationEasing;
            }
            map.setRotation(part.rotation, { ...params, normalize: false });
        }

        if (typeof part.f === 'function') {
            part.f();
        }

        if (part.waitIdle) {
            await waitIdle();
        } else {
            await sleep(duration);
        }
    }
}

const plugin = new mapgl.GltfPlugin(map, {
    modelsLoadStrategy: 'waitAll',
    ambientLight: { color: '#ffffff', intencity: 3 },
    modelsBaseUrl: 'https://disk.2gis.com/digital-twin/models_s3/realty_ads/sakura/',
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
        modelId: 'sakuraenv',
        coordinates: [82.935544, 55.024592],
        rotateX: 90,
        rotateY: 54.42,
        scale: 174.8,
        modelUrl: 'sakuraenv.glb',
        mapOptions: {
            center: [82.93592359937531, 55.02526127423217],
            pitch: 53,
            zoom: 17.9,
            rotation: 73,
        },
    },
    {
        modelId: 'sakura1',
        coordinates: [
            82.93554344,
            55.0245921
        ],
        rotateX: 90,
        rotateY: 54.42,
        scale: 175.1
        ,
        modelUrl: 'sakura1.glb',
        linkedIds: ['70030076322363650'],
        mapOptions: {
            center: [82.93530200751717, 55.02477542666621],
            pitch: 34.64,
            zoom: 18.9,
            rotation: 53,
        },
        popupOptions: {
            coordinates: [82.93553028610054, 55.024618576859815],
            title: 'Sakura 1',
            description: 'Ready <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
        },
        floors: [
            {
                id: '1',
                text: '1',
                modelUrl: 'sakura1floor1.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 20.3,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '2',
                text: '2',
                modelUrl: 'sakura1floor2.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 20.2,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '3',
                text: '3',
                modelUrl: 'sakura1floor3.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 20.1,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '4',
                text: '4',
                modelUrl: 'sakura1floor4.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 20.05,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '5',
                text: '5',
                modelUrl: 'sakura1floor5.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 20,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '6',
                text: '6',
                modelUrl: 'sakura1floor6.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.95,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '7',
                text: '7',
                modelUrl: 'sakura1floor7.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.9,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '8',
                text: '8',
                modelUrl: 'sakura1floor8.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.85,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '9',
                text: '9',
                modelUrl: 'sakura1floor9.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.8,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '10',
                text: '10',
                modelUrl: 'sakura1floor10.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.75,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '11',
                text: '11',
                modelUrl: 'sakura1floor11.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.7,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '12',
                text: '12',
                modelUrl: 'sakura1floor12.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.65,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '13',
                text: '13',
                modelUrl: 'sakura1floor13.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '14',
                text: '14',
                modelUrl: 'sakura1floor14.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.55,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '15',
                text: '15',
                modelUrl: 'sakura1floor15.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.5,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '16',
                text: '16',
                modelUrl: 'sakura1floor16.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.45,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '17',
                text: '17',
                modelUrl: 'sakura1floor17.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.42,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '18',
                text: '18',
                modelUrl: 'sakura1floor18.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.39,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '19',
                text: '19',
                modelUrl: 'sakura1floor19.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.36,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '20',
                text: '20',
                modelUrl: 'sakura1floor20.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.33,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '21',
                text: '21',
                modelUrl: 'sakura1floor21.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.30,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '22',
                text: '22',
                modelUrl: 'sakura1floor22.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.27,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '23',
                text: '23',
                modelUrl: 'sakura1floor23.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.24,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '24',
                text: '24',
                modelUrl: 'sakura1floor24.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.21,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '25',
                text: '25',
                modelUrl: 'sakura1floor25.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.18,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
        ],
    },
    {
        modelId: 'sakura2',
        coordinates: [
            82.9355424,
            55.0245912
        ],
        rotateX: 90,
        rotateY: 54.42,
        scale: 175.1,
        modelUrl: 'sakura2.glb',
        linkedIds: ['70030076561324098'],
        mapOptions: {
            center: [82.93588184658573, 55.02521088980645],
            pitch: 34.64,
            zoom: 18.9,
            rotation: 53,
        },
        popupOptions: {
            coordinates: [82.93611632244958, 55.02510191007816],
            title: 'Sakura 2',
            description: 'Ready <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
        },
        floors: [
            {
                id: '1',
                text: '1',
                modelUrl: 'sakura2floor1.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 20.3,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '2',
                text: '2',
                modelUrl: 'sakura2floor2.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 20.2,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '3',
                text: '3',
                modelUrl: 'sakura2floor3.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 20.1,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '4',
                text: '4',
                modelUrl: 'sakura2floor4.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 20.05,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '5',
                text: '5',
                modelUrl: 'sakura2floor5.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 20,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '6',
                text: '6',
                modelUrl: 'sakura2floor6.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.95,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '7',
                text: '7',
                modelUrl: 'sakura2floor7.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.9,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '8',
                text: '8',
                modelUrl: 'sakura2floor8.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.85,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '9',
                text: '9',
                modelUrl: 'sakura2floor9.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.8,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '10',
                text: '10',
                modelUrl: 'sakura2floor10.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.75,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '11',
                text: '11',
                modelUrl: 'sakura2floor11.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.7,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '12',
                text: '12',
                modelUrl: 'sakura2floor12.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.65,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '13',
                text: '13',
                modelUrl: 'sakura2floor13.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '14',
                text: '14',
                modelUrl: 'sakura2floor14.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.55,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '15',
                text: '15',
                modelUrl: 'sakura2floor15.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.5,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '16',
                text: '16',
                modelUrl: 'sakura2floor16.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.45,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '17',
                text: '17',
                modelUrl: 'sakura2floor17.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.42,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '18',
                text: '18',
                modelUrl: 'sakura2floor18.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.39,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '19',
                text: '19',
                modelUrl: 'sakura2floor19.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.36,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '20',
                text: '20',
                modelUrl: 'sakura2floor20.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.33,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '21',
                text: '21',
                modelUrl: 'sakura2floor21.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.30,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '22',
                text: '22',
                modelUrl: 'sakura2floor22.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.27,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '23',
                text: '23',
                modelUrl: 'sakura2floor23.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.24,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '24',
                text: '24',
                modelUrl: 'sakura2floor24.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.21,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '25',
                text: '25',
                modelUrl: 'sakura2floor25.glb',
                mapOptions: {
                    center: [82.93634821778734, 55.02503592437247],
                    pitch: 0.001,
                    zoom: 19.18,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            }
        ],
    },
    {
        modelId: 'sakura3',
        coordinates: [
            82.9355435,
            55.0245893
        ],
        rotateX: 90,
        rotateY: 54.49,
        scale: 175.1,
        modelUrl: 'sakura3.glb',
        linkedIds: ['70030076561324411'],
        mapOptions: {
            center: [82.9365729268617, 55.02568768389654],
            pitch: 34.64,
            zoom: 18.9,
            rotation: 53,
        },
        popupOptions: {
            coordinates: [82.93672730100035, 55.025536774587046],
            title: 'Sakura 3',
            description: 'Ready <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
        },
        floors: [
            {
                id: '1',
                text: '1',
                modelUrl: 'sakura3floor1.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 20.3,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '2',
                text: '2',
                modelUrl: 'sakura3floor2.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 20.2,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '3',
                text: '3',
                modelUrl: 'sakura3floor3.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 20.1,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '4',
                text: '4',
                modelUrl: 'sakura3floor4.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 20.05,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '5',
                text: '5',
                modelUrl: 'sakura3floor5.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 20,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '6',
                text: '6',
                modelUrl: 'sakura3floor6.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.95,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '7',
                text: '7',
                modelUrl: 'sakura3floor7.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.9,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '8',
                text: '8',
                modelUrl: 'sakura3floor8.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.85,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '9',
                text: '9',
                modelUrl: 'sakura3floor9.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.8,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '10',
                text: '10',
                modelUrl: 'sakura3floor10.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.75,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '11',
                text: '11',
                modelUrl: 'sakura3floor11.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.7,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '12',
                text: '12',
                modelUrl: 'sakura3floor12.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.65,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '13',
                text: '13',
                modelUrl: 'sakura3floor13.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '14',
                text: '14',
                modelUrl: 'sakura3floor14.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.55,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '15',
                text: '15',
                modelUrl: 'sakura3floor15.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.5,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '16',
                text: '16',
                modelUrl: 'sakura3floor16.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.45,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '17',
                text: '17',
                modelUrl: 'sakura3floor17.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.42,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '18',
                text: '18',
                modelUrl: 'sakura3floor18.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.39,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '19',
                text: '19',
                modelUrl: 'sakura3floor19.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.36,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '20',
                text: '20',
                modelUrl: 'sakura3floor20.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.33,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '21',
                text: '21',
                modelUrl: 'sakura3floor21.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.30,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '22',
                text: '22',
                modelUrl: 'sakura3floor22.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.27,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '23',
                text: '23',
                modelUrl: 'sakura3floor23.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.24,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '24',
                text: '24',
                modelUrl: 'sakura3floor24.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.21,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },
            {
                id: '25',
                text: '25',
                modelUrl: 'sakura3floor25.glb',
                mapOptions: {
                    center: [82.93704187736921, 55.025489666757025],
                    pitch: 0.001,
                    zoom: 19.18,
                    rotation: 54.116509698935765,
                },
                poiGroups: [],
            },],
    },
];

plugin.addRealtyScene(realtyScene);


// {
//     id: '2',
//     text: '2',
//     modelUrl: 'standpointtowers4-2.glb',
//     mapOptions: {
//         center: [55.27101659214413, 25.19692572574951],
//         pitch: 17.8,
//         zoom: 20.8,
//         rotation: 137.02588223579758,
//     },
//     poiGroups: [
//         {
//             id: 1111,
//             type: 'primary',
//             minZoom: 18.9,
//             elevation: 10,
//             fontSize: 9,
//             fontColor: '#3a3a3a',
//             data: [
//                 {
//                     coordinates: [55.27095943017267, 25.197085861856678],
//                     label: '1 Bed\n323 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.271011424317585, 25.19704189077632],
//                     label: '1 Bed\n360 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.27086972852069, 25.196999662434976],
//                     label: '1 Bed\n330 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.2711596091742, 25.196857840495],
//                     label: '1 Bed\n690 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.2710044354644, 25.19689784165797],
//                     label: '1 Bed\n600 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.27109216906766, 25.196807837435273],
//                     label: '4 Beds\n1800 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.27114979328282, 25.196936631205745],
//                     label: '2 Beds\n1500 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.27094029099825, 25.19695530862026],
//                     label: '2 Beds\n1215 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//                 {
//                     coordinates: [55.271084685746885, 25.196991799213222],
//                     label: '3 Beds\n2400 sqft',
//                     userData: {
//                         url: 'https://dev.urbi.ae/',
//                     },
//                 },
//             ],
//         },
//     ],
// },
