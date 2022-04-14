// API key can be used on 2gis.github.io/mapgl-examples only!
const key = 'a1893935-6834-4445-b97a-3405fb426c5b';

const map = new mapgl.Map('map', {
    center: [82.89063353068022, 54.98359138225009],
    zoom: 17,
    key,
});
window.addEventListener('resize', () => map.invalidateSize());
map.on('click', (ev) => console.log(ev.lngLat));

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

map.once('styleload', () => {
    const lineFilter = [
        'all',
        ['==', ['sourceAttr', 'foo'], 'bar'],
        ['==', ['get', 'type'], 'path'],
        [
            'any',
            ['==', ['get', 'floodId'], null],
            ['in', ['get', 'floodId'], ['global', '_activeFloorIds']],
        ],
    ];
    map.addLayer({
        id: 'my-line-white',
        type: 'line',
        filter: lineFilter,
        style: {
            width: 9,
            color: '#fff',
        },
    });
    map.addLayer({
        id: 'my-line',
        type: 'line',
        filter: lineFilter,
        style: {
            width: 5,
            color: [
                'match',
                ['get', 'floodId'],
                ['141832716800582'],
                '#00ff00',
                ['141832716803532'],
                '#0000ff',
                '#ff0000',
            ],
        },
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
                ['==', ['get', 'floodId'], null],
                ['in', ['get', 'floodId'], ['global', '_activeFloorIds']],
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
        },
    });
    map.addLayer({
        id: 'my-point-end',
        type: 'point',
        filter: [
            'all',
            ['==', ['sourceAttr', 'foo'], 'bar'],
            ['==', ['get', 'type'], 'end'],
            [
                'any',
                ['==', ['get', 'floodId'], null],
                ['in', ['get', 'floodId'], ['global', '_activeFloorIds']],
            ],
        ],
        style: {
            iconImage: 'ent_i',
            iconWidth: 27,
            textFont: 'Noto_Sans',
            textFontSize: 12,
            textField: ['get', 'comment'],
            iconPriority: 2000,
            textPriority: 2000,
            textColor: '#fff',
            textPlacement: 'centerCenter',
        },
    });
});

async function fetchAndDrawRoute() {
    const query = {
        type: 'pedestrian',
        points: [
            {
                start: true,
                type: 'pedo',
                x: 82.88828966022959,
                y: 54.983109254770376,
            },
            {
                start: false,
                type: 'pedo',
                x: 82.89149408367815,
                y: 54.98388809715867,
                object_id: '141265770013202',
                floor_id: '141832716803532',
            },
        ],
        use_indoor: true,
        options: ['pedestrian_instructions'],
    };

    return fetch(`https://catalog.api.2gis.ru/carrouting/6.0.0/global?key=rujany4131`, {
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

fetchAndDrawRoute();

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
                    floodId: points[1].floor_id,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [points[1].x, points[1].y],
                },
            },
        ],
    };

    result.maneuvers.forEach((maneuver) => {
        if (maneuver.outcoming_path) {
            if (maneuver.comment && maneuver.outcoming_path.geometry.length) {
                const coordinates = parserLineStringWKT(
                    maneuver.outcoming_path.geometry[0].selection,
                )[0];
                const feature = {
                    type: 'Feature',
                    properties: {
                        type: 'point',
                        comment: maneuver.comment,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates,
                    },
                };
                if (maneuver.outcoming_path.floor_from) {
                    feature.properties.floodId = maneuver.outcoming_path.floor_from;
                }
                data.features.push(feature);
            }
            maneuver.outcoming_path.geometry.forEach((geometry) => {
                const feature = {
                    type: 'Feature',
                    properties: {
                        type: 'path',
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: parserLineStringWKT(geometry.selection),
                    },
                };

                if (maneuver.outcoming_path.floor_from) {
                    feature.properties.floodId = maneuver.outcoming_path.floor_from;
                }

                data.features.push(feature);
            });
        }
    });

    geojsonSource.setData(data);
}

function parserLineStringWKT(wkt) {
    return wkt
        .slice('LINESTRING('.length, -1)
        .split(',')
        .map((c) => c.trim().split(' ').map(Number));
}
