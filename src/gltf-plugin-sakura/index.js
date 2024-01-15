const map = new mapgl.Map('container', {
    center: [82.93569713407153, 55.02512834592805],
    zoom: 18.25,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    pitch: 53,
    rotation: 73,
    enableTrackResize: true,
    maxZoom: 21,
});

const needPreload = new URL(location.href).searchParams.has('preload');
const curtain = document.getElementById('curtain');
curtain.style.display = 'block';

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

function removeLabels() {
    if (map._impl.currentPendingStyle) {
        map.once('styleload', () => {
            labelIds.forEach((id) => {
                map.removeLayer(id);
            });
        });
        return;
    }

    labelIds.forEach((id) => {
        map.removeLayer(id);
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
            });
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
    modelsLoadStrategy: needPreload ? 'waitAll' : 'dontWaitAll',
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
        coordinates: [82.93554344, 55.0245921],
        rotateX: 90,
        rotateY: 54.42,
        scale: 175.1,
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
            title: 'Дом 1',
            description: 'Срок сдачи: 2 квартал 2024 г.',
        },
        floors: [
            {
                id: '-3',
                text: '-3',
                modelUrl: 'sakuragarage3.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 1003,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 0.001,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-2',
                text: '-2',
                modelUrl: 'sakuragarage2.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 1002,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 3,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-1',
                text: '-1',
                modelUrl: 'sakuragarage1.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 1001,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 6,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
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
                poiGroups: [
                    {
                        id: 101,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 1,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93566283730352, 55.02431170923094],
                                label: 'Офис 1\n32.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93546027946417, 55.024505474267606],
                                label: 'Офис 4\n35.2 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93570374046925, 55.024836877623045],
                                label: 'Офис 9\n96.45 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 102,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 5,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 103,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 8,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 104,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 11,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 105,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 14,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 106,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 16.75,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 107,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 19.75,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 108,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 22.75,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 109,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 25.65,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 110,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 28.5,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 111,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 31.25,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 112,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 34.15,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 113,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 37,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 114,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 39.65,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 115,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 42.25,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 116,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 45,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 117,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 47.75,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 118,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 50.5,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 119,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 53.35,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 120,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 55.95,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '21',
                text: '21',
                modelUrl: 'sakura1floor21.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.3,
                    rotation: 54.116509698935765,
                },
                poiGroups: [
                    {
                        id: 121,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 59,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 122,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 61.75,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '23',
                text: '23',
                modelUrl: 'sakura1floor23_fur.glb',
                mapOptions: {
                    center: [82.93566657544838, 55.02457252304874],
                    pitch: 0.001,
                    zoom: 19.24,
                    rotation: 54.116509698935765,
                },
                poiGroups: [
                    {
                        id: 123,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 64.5,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 124,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 67.4,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 125,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 70.15,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93532879915665, 55.024610488879894],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9354390072042, 55.02455512375257],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93547884848776, 55.02451023848019],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93555864586605, 55.0243604060633],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93562451639922, 55.02430149414303],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9357979990563, 55.02482897466938],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        modelId: 'sakura2',
        coordinates: [82.9355424, 55.0245912],
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
            title: 'Дом 2',
            description: 'Срок сдачи: 1 квартал 2025 г.',
        },
        floors: [
            {
                id: '-3',
                text: '-3',
                modelUrl: 'sakuragarage3.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 2003,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 0.001,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-2',
                text: '-2',
                modelUrl: 'sakuragarage2.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 2002,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 3,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-1',
                text: '-1',
                modelUrl: 'sakuragarage1.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 2001,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 6,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
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
                poiGroups: [
                    {
                        id: 201,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 1,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93636813698447, 55.024784207565496],
                                label: 'Офис 1\n32.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93617230960257, 55.02497927886716],
                                label: 'Офис 4\n35.2 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93638067181605, 55.025303076292325],
                                label: 'Офис 9\n96.45 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 205,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 14,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93601985444766, 55.02507740479571],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9361317747682, 55.025020237259675],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93616589717568, 55.02497739671335],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93624378984119, 55.02482336926575],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93633491528325, 55.024774067627696],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93648000007295, 55.02530416124139],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                    zoom: 19.3,
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
                poiGroups: [
                    {
                        id: 225,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 70,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93601985444766, 55.02507740479571],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.9361317747682, 55.025020237259675],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93616589717568, 55.02497739671335],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93624378984119, 55.02482336926575],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93633491528325, 55.024774067627696],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93648000007295, 55.02530416124139],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        modelId: 'sakura3',
        coordinates: [82.9355435, 55.0245893],
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
            title: 'Дом 3',
            description: 'Срок сдачи: 4 квартал 2026 г.',
        },
        floors: [
            {
                id: '-3',
                text: '-3',
                modelUrl: 'sakuragarage3.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 3003,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 0.001,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-2',
                text: '-2',
                modelUrl: 'sakuragarage2.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 3002,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 3,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                id: '-1',
                text: '-1',
                modelUrl: 'sakuragarage1.glb',
                isUnderground: true,
                mapOptions: {
                    center: [82.93613846640994, 55.02487619897599],
                    pitch: 0.001,
                    zoom: 19.6,
                    rotation: 54.4895,
                },
                poiGroups: [
                    {
                        id: 3001,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 6,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93602504445663, 55.02479674835337],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93572786693463, 55.024460831819475],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                            {
                                coordinates: [82.93665717644525, 55.025211680011715],
                                label: 'П\n13.25 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/parking/?project=4303',
                                },
                            },
                        ],
                    },
                ],
            },
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
                poiGroups: [
                    {
                        id: 301,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 1,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.93704062007214, 55.025239796684595],
                                label: 'Офис 1\n32.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93684968529901, 55.025431886722636],
                                label: 'Офис 4\n35.2 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93706158472665, 55.02575801144653],
                                label: 'Офис 9\n96.45 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                poiGroups: [
                    {
                        id: 305,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 14,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.9367027271309, 55.02553047927582],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93681330397604, 55.02547395738103],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93684687574424, 55.02543495080662],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93692926000382, 55.02528252055639],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93700650192216, 55.02522814050097],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93716303866796, 55.02575846606976],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
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
                    zoom: 19.3,
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
                poiGroups: [
                    {
                        id: 325,
                        type: 'primary',
                        minZoom: 18.5,
                        elevation: 70,
                        fontSize: 9,
                        fontColor: '#3a3a3a',
                        data: [
                            {
                                coordinates: [82.9367027271309, 55.02553047927582],
                                label: '2С\n63.99 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93681330397604, 55.02547395738103],
                                label: '1К\n50.36 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93684687574424, 55.02543495080662],
                                label: '3К\n95.78 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93692926000382, 55.02528252055639],
                                label: '2К\n62.34 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93700650192216, 55.02522814050097],
                                label: '3К\n78.95 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                            {
                                coordinates: [82.93716303866796, 55.02575846606976],
                                label: '2К\n64.44 м²',
                                userData: {
                                    url: 'https://xn--80aafcmzc2ckm5b.xn--p1ai/vybor-kvartir/?SECTION_ID=384',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

plugin.addRealtyScene(realtyScene).then(() => {
    curtain.style.display = 'none';
});

const labelIds = [
    '43556',
    '44814',
    '73948',
    '632416',
    '227',
    '159784',
    '135503',
    '740815',
    '682782',
    '924721',
    '272603',
    '501891',
    '77098',
    '711817',
    '758882',
    '113080',
    '5946',
    '661538',
    '805874',
    '815549',
    '191129',
    '309294',
    '346254',
    '444276',
    '615525',
    '832861',
    'barrier',
    'gate',
    '444318',
    'porch',
    'porch under house',
    'traffic light',
    '246968',
    '853413',
    '533740',
    '657681',
    '776122',
    '949217',
    'city caption',
    '405141',
    '53095',
    '996686',
    '783289',
    '969831',
    '563870',
    '70184',
];
