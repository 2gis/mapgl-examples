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
let showAlways = false;
map.setStyleState({
    showPoints,
    showAlways,
});
document.querySelector('#toggle-points').addEventListener('click', () => {
    showPoints = !showPoints;
    map.setStyleState({
        showPoints,
        showAlways,
    });
});
document.querySelector('#show-always').addEventListener('click', (ev) => {
    showAlways = !showAlways;
    ev.target.innerHTML = showAlways
        ? 'Enable dependency on floors'
        : 'Disable dependency on floors';
    map.setStyleState({
        showPoints,
        showAlways,
    });
});

// Add styleds for points and segments
map.once('styleload', () => {
    const whiteLineStyle = {
        width: 9,
        color: '#fff',
    };
    const lineStyle = {
        width: 5,
        color: ['match', ['get', 'index'], [-1], '#ccc', [0], '#00ff00', [1], '#0000ff', '#ff0000'],
    };

    // Lines which are showing under houses
    const lineFilter = [
        'all',
        ['==', ['sourceAttr', 'foo'], 'bar'],
        ['==', ['get', 'type'], 'path'],
        ['==', ['global', 'showAlways'], false],
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
            style: whiteLineStyle,
        },
        '344517',
    );
    map.addLayer(
        {
            id: 'my-line',
            type: 'line',
            filter: lineFilter,
            style: lineStyle,
        },
        '344517',
    );

    // Lines which are showing under houses
    const lineAboveFilter = [
        'all',
        ['==', ['sourceAttr', 'foo'], 'bar'],
        ['==', ['get', 'type'], 'path'],
        ['==', ['global', 'showAlways'], true],
    ];
    map.addLayer({
        id: 'my-line-white-above',
        type: 'line',
        filter: lineAboveFilter,
        style: whiteLineStyle,
    });
    map.addLayer({
        id: 'my-line-above',
        type: 'line',
        filter: lineAboveFilter,
        style: lineStyle,
    });

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
                ['==', ['global', 'showAlways'], true],
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
                    ['==', ['global', 'showAlways'], true],
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
    console.log(ev);

    if (ev.targetData?.floorId) {
        points.push({
            type: 'pedo',
            x: ev.lngLat[0],
            y: ev.lngLat[1],
            floor_id: ev.targetData.floorId,

            // TODO: в targetData.id у нас могут приходить как firmId, так и buildingId.
            // В navi в object_id передавать buildingId нельзя, поэтому нужно научиться из различать.
            // object_id: ev.targetData.id,
        });
    } else {
        points.push({
            type: 'pedo',
            x: ev.lngLat[0],
            y: ev.lngLat[1],
        });
    }

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
