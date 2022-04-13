const map = new mapgl.Map('map', {
    center: [55.367087, 25.243223],
    zoom: 11,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

map.on('styleload', () => {
    map.addLayer({
        id: 'my-polygon',
        type: 'polygon',
        filter: [
            'all',
            ['match', ['get', 'state'], ['hover'], false, true],
            ['match', ['sourceAttr', 'foo'], ['bar'], true, false],
        ],
        style: {
            color: '#00ff0088',
        },
    });

    map.addLayer({
        id: 'my-polygon-hover',
        type: 'polygon',
        filter: [
            'all',
            ['match', ['get', 'state'], ['hover'], true, false],
            ['match', ['sourceAttr', 'foo'], ['bar'], true, false],
        ],
        style: {
            color: '#ff000088',
        },
    });
});

const geojsonSource = new mapgl.GeoJsonSource(map, {
    data: getGeoJsonData(),
    attributes: {
        foo: 'bar',
    },
});

map.on('mouseover', (ev) => {
    if (ev.targetData && ev.targetData.source === geojsonSource) {
        const uid = ev.targetData.feature.properties.uid;

        if (ev.targetData) {
            geojsonSource.setData(getGeoJsonData(uid));
        }
    }
});

function getGeoJsonData(hoverUid) {
    const data = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    uid: 0,
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [55.29624938964844, 25.10798445491342],
                            [55.297622680664055, 25.042681800625722],
                            [55.364227294921875, 25.062587250954792],
                            [55.49812316894531, 25.176980784396388],
                            [55.37933349609374, 25.228547132003744],
                            [55.29624938964844, 25.10798445491342],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {
                    uid: 1,
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [55.44937133789062, 25.3241665257384],
                            [55.408172607421875, 25.268915156482645],
                            [55.47889709472656, 25.224199006454462],
                            [55.59150695800781, 25.27512443097316],
                            [55.53314208984375, 25.36015947545358],
                            [55.44937133789062, 25.3241665257384],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {
                    uid: 2,
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [55.29144287109375, 25.11668884314787],
                            [55.36834716796875, 25.229168280105522],
                            [55.30723571777344, 25.271398904400556],
                            [55.23719787597656, 25.190651100074007],
                            [55.13694763183594, 25.077514216878676],
                            [55.292816162109375, 25.046414318770978],
                            [55.29144287109375, 25.11668884314787],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {
                    uid: 3,
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [55.47477722167969, 25.22171429348812],
                            [55.394439697265625, 25.267052312190323],
                            [55.44593811035156, 25.330993597596898],
                            [55.531768798828125, 25.36822539131413],
                            [55.46722412109375, 25.4339735258004],
                            [55.399932861328125, 25.37380917154398],
                            [55.31341552734375, 25.27512443097316],
                            [55.45623779296875, 25.20183476285806],
                            [55.47477722167969, 25.22171429348812],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {
                    uid: 4,
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [55.46379089355469, 25.199970890386023],
                            [55.50224304199219, 25.183194754374412],
                            [55.58326721191406, 25.265810400113477],
                            [55.485076904296875, 25.219229529766075],
                            [55.46379089355469, 25.199970890386023],
                        ],
                    ],
                },
            },
        ],
    };

    if (hoverUid !== undefined) {
        data.features.forEach((feature) => {
            if (feature.properties.uid === hoverUid) {
                feature.properties.state = 'hover';
            }
        });
    }

    return data;
}
