// API key can be used on 2gis.github.io/mapgl-examples only!
const key = 'a1893935-6834-4445-b97a-3405fb426c5b';
const directionsKey = 'rujany4131';

const map = new mapgl.Map('map', {
    center: [82.89063353068022, 54.98359138225009],
    zoom: 17,
    key,
});
window.addEventListener('resize', () => map.invalidateSize());

// Enable floor control on the right
const floorControl = new mapgl.FloorControl(map, {
    position: 'topRight',
});

let showPoints = true;
map.setStyleState({
    showPoints,
});
document.querySelector('#toggle-points').addEventListener('click', () => {
    showPoints = !showPoints;
    map.setStyleState({
        showPoints,
    });
});

// Add styleds for points and segments
map.once('styleload', () => {
    const lineFilter = [
        'all',
        ['==', ['sourceAttr', 'foo'], 'bar'],
        ['==', ['get', 'type'], 'path'],
        [
            'any',
            ['==', ['get', 'floorId'], null],
            ['in', ['get', 'floorId'], ['global', '_activeFloorIds']],
        ],
    ];
    map.addLayer(
        {
            id: 'my-line-white',
            type: 'line',
            filter: lineFilter,
            style: {
                width: 9,
                color: '#fff',
            },
        },
        '344517',
    );
    map.addLayer(
        {
            id: 'my-line',
            type: 'line',
            filter: lineFilter,
            style: {
                width: 5,
                color: [
                    'match',
                    ['get', 'index'],
                    [-1],
                    '#ccc',
                    [0],
                    '#00ff00',
                    [1],
                    '#0000ff',
                    '#ff0000',
                ],
            },
        },
        '344517',
    );

    map.addLayer({
        id: 'my-point',
        type: 'point',
        filter: [
            'all',
            ['global', 'showPoints'],
            ['==', ['sourceAttr', 'foo'], 'bar'],
            ['==', ['get', 'type'], 'point'],
            [
                'any',
                ['==', ['get', 'floorId'], null],
                ['in', ['get', 'floorId'], ['global', '_activeFloorIds']],
            ],
        ],
        style: {
            iconImage: 'ent',
            iconWidth: 15,
            textFont: 'Noto_Sans',
            textFontSize: 10,
            textField: ['get', 'comment'],
            iconPriority: 1000,
            textPriority: 1000,
            textHaloWidth: 1,
            textHaloColor: '#fff',
            allowOverlap: true,
        },
    });
    map.addLayer({
        id: 'my-point-end',
        type: 'point',
        filter: ['all', ['==', ['sourceAttr', 'foo'], 'bar'], ['==', ['get', 'type'], 'end']],
        style: {
            iconImage: [
                'match',
                [
                    'any',
                    ['==', ['get', 'floorId'], null],
                    ['in', ['get', 'floorId'], ['global', '_activeFloorIds']],
                ],
                [true],
                'ent_i',
                'ent',
            ],
            iconWidth: 30,
            textFont: 'Noto_Sans_Semibold',
            textFontSize: 14,
            textField: ['get', 'comment'],
            iconPriority: 2000,
            textPriority: 2000,
            textColor: '#fff',
            textPlacement: 'centerCenter',
        },
    });
});

const points = [
    {
        type: 'pedo',
        x: 82.88828966022959,
        y: 54.983109254770376,
    },
    {
        type: 'pedo',
        x: 82.89149408367815,
        y: 54.98388809715867,
        object_id: '141265770013202',
        floor_id: '141832716803532',
    },
];

map.on('click', (ev) => {
    // WARNING: Do not use this in production code,
    // until MapGL release with new map.getStyleState() method.
    const styleState = map.getStyleState?.() || map._impl.state.styleState;

    points.push({
        type: 'pedo',
        x: ev.lngLat[0],
        y: ev.lngLat[1],
        floor_id: styleState._activeFloorIds?.[0],
        object_id: ev.target?.id,
    });
    points.splice(0, 1);
    fetchAndDrawRoute();
});

fetchAndDrawRoute();

function fetchAndDrawRoute() {
    const query = {
        type: 'pedestrian',
        points,
        use_indoor: true,
        options: ['pedestrian_instructions'],
    };

    return fetch(`https://catalog.api.2gis.ru/carrouting/6.0.0/global?key=${directionsKey}`, {
        method: 'post',
        body: JSON.stringify(query),
    })
        .then((r) => {
            if (r.status !== 200) {
                throw new Error(`HTTP code is ${r.status}`);
            }
            return r.json();
        })
        .then((r) => drawRoute(query.points, r.result && r.result[0]));
}

const geojsonSource = new mapgl.GeoJsonSource(map, {
    data: {
        type: 'FeatureCollection',
        features: [],
    },
    attributes: {
        foo: 'bar',
    },
});

function drawRoute(points, result) {
    if (!result) {
        return;
    }

    const data = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    type: 'end',
                    comment: 'A',
                    floorId: points[0].floor_id,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [points[0].x, points[0].y],
                },
            },
            {
                type: 'Feature',
                properties: {
                    type: 'end',
                    comment: 'B',
                    floorId: points[1].floor_id,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [points[1].x, points[1].y],
                },
            },
        ],
    };

    let colorIndex = 0;
    let isFirstSegmentAdded = false;
    let lastPoint = {
        coordinates: [points[0].x, points[0].y],
        floorId: points[0].floor_id,
    };

    result.maneuvers.forEach((maneuver) => {
        if (maneuver.outcoming_path && maneuver.outcoming_path.geometry.length) {
            const firstCoord = parserLineStringWKT(
                maneuver.outcoming_path.geometry[0].selection,
            )[0];

            if (maneuver.comment) {
                data.features.push({
                    type: 'Feature',
                    properties: {
                        type: 'point',
                        comment: maneuver.comment,
                        floorId: maneuver.outcoming_path.floor_from,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: firstCoord,
                    },
                });
            }

            if (!isFirstSegmentAdded) {
                isFirstSegmentAdded = true;
                data.features.push({
                    type: 'Feature',
                    properties: {
                        type: 'path',
                        index: -1,
                        floorId: maneuver.outcoming_path.floor_from,
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [[points[0].x, points[0].y], firstCoord],
                    },
                });
            }

            maneuver.outcoming_path.geometry.forEach((geometry) => {
                const coordinates = parserLineStringWKT(geometry.selection);
                data.features.push({
                    type: 'Feature',
                    properties: {
                        type: 'path',
                        index: colorIndex++ % 3,
                        floorId: maneuver.outcoming_path.floor_to,
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates,
                    },
                });
                lastPoint = {
                    coordinates: coordinates[coordinates.length - 1],
                    floorId: maneuver.outcoming_path.floor_to,
                };
            });
        } else if (maneuver.comment) {
            data.features.push({
                type: 'Feature',
                properties: {
                    type: 'point',
                    comment: maneuver.comment,
                    floorId: lastPoint.floorId,
                },
                geometry: {
                    type: 'Point',
                    coordinates: lastPoint.coordinates,
                },
            });
        }
    });

    if (lastPoint) {
        data.features.push({
            type: 'Feature',
            properties: {
                type: 'path',
                floorId: lastPoint.floorId,
                index: -1,
            },
            geometry: {
                type: 'LineString',
                coordinates: [lastPoint.coordinates, [points[1].x, points[1].y]],
            },
        });
    }

    geojsonSource.setData(data);
}

function parserLineStringWKT(wkt) {
    return wkt
        .slice('LINESTRING('.length, -1)
        .split(',')
        .map((c) => c.trim().split(' ').map(Number));
}
