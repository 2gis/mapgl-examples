// API key can be used on 2gis.github.io/mapgl-examples only!
const key = 'a1893935-6834-4445-b97a-3405fb426c5b';
const directionsKey = 'rujany4131';

const map = new mapgl.Map('map', {
    center: [55.40986, 25.226925],
    zoom: 11,
    key,
});
window.addEventListener('resize', () => map.invalidateSize());

const points = [
    {
        x: 55.38982952809094,
        y: 25.094646271318183,
        type: 'pedo',
    },
    {
        x: 55.399926406897144,
        y: 25.338225308052472,
        type: 'pedo',
    },
];

let obstacles = [];
let obstacleMapObjects = [];

fetchAndDrawRoute(points, obstacles);

document.querySelector('#add-round').onclick = async () => {
    const coordinates = [55.36487330656564, 25.119989823594025];
    const radiusInMeters = 3000;
    obstacles.push({
        type: 'point',
        points: [
            {
                x: coordinates[0],
                y: coordinates[1],
            },
        ],
        extent: radiusInMeters,
        severity: 'hard',
    });
    await fetchAndDrawRoute(points, obstacles);
    obstacleMapObjects.push(
        new mapgl.Circle(map, {
            coordinates,
            radius: radiusInMeters,
        }),
    );
};

document.querySelector('#add-line').onclick = async () => {
    const coordinates = [
        [55.330388050837804, 25.28088455540494],
        [55.43552031537433, 25.22608999281948],
    ];
    obstacles.push({
        type: 'polyline',
        points: coordinates.map((point) => ({
            x: point[0],
            y: point[1],
        })),
        extent: 10,
        severity: 'hard',
    });
    await fetchAndDrawRoute(points, obstacles);
    obstacleMapObjects.push(
        new mapgl.Polyline(map, {
            coordinates,
        }),
    );
};

document.querySelector('#add-area').onclick = async () => {
    const coordinates = [
        [55.41432385219307, 25.20269764147224],
        [55.41226391568186, 25.16417208767625],
        [55.48848156498761, 25.125634360878024],
        [55.54547314232755, 25.172872470801977],
    ];
    obstacles.push({
        type: 'polygon',
        points: coordinates.map((point) => ({
            x: point[0],
            y: point[1],
        })),
        severity: 'hard',
    });
    await fetchAndDrawRoute(points, obstacles);
    obstacleMapObjects.push(
        new mapgl.Polygon(map, {
            coordinates: [coordinates],
        }),
    );
};

document.querySelector('#reset').onclick = async () => {
    obstacles = [];
    await fetchAndDrawRoute(points, obstacles);
    obstacleMapObjects.forEach((obj) => obj.destroy());
    obstacleMapObjects = [];
};

let route = {
    polylines: [],
};

async function fetchAndDrawRoute(points, obstacles) {
    const query = {
        type: 'jam',
        point_a_name: 'Source',
        point_b_name: 'Target',
        locale: 'en',
        points,
        exclude: obstacles,
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
        .then((r) => drawRoute(r.result && r.result[0]));
}

const colors = {
    ignore: '#0f6ec1',
    pedestrian: '#626262',
    normal: '#ffc402',
    fast: '#22aa01',
    slow: '#ed2301',
    'slow-jams': '#851705',
};

function drawRoute(result) {
    if (!result) {
        return;
    }

    // Clear previous polylines
    route.polylines.forEach((p) => p.destroy());

    route.polylines = [];

    if (result.begin_pedestrian_path) {
        const p = new mapgl.Polyline(map, {
            coordinates: parserLineStringWKT(result.begin_pedestrian_path.geometry.selection),
            zIndex: 1,
            zIndex2: 0,
            color: colors.pedestrian,
            color2: '#ffffff',
            width: 5,
            width2: 8,
        });
        route.polylines.push(p);
    }
    if (result.end_pedestrian_path) {
        const p = new mapgl.Polyline(map, {
            coordinates: parserLineStringWKT(result.end_pedestrian_path.geometry.selection),
            zIndex: 1,
            zIndex2: 0,
            color: colors.pedestrian,
            color2: '#ffffff',
            width: 5,
            width2: 8,
        });
        route.polylines.push(p);
    }

    result.maneuvers.forEach((maneuver) => {
        if (maneuver.outcoming_path) {
            maneuver.outcoming_path.geometry.forEach((geometry) => {
                const p = new mapgl.Polyline(map, {
                    coordinates: parserLineStringWKT(geometry.selection),
                    zIndex: 1,
                    zIndex2: 0,
                    color: colors[geometry.color],
                    color2: '#ffffff',
                    width: 5,
                    width2: 8,
                });
                route.polylines.push(p);
            });
        }
    });
}

function parserLineStringWKT(wkt) {
    return wkt
        .slice('LINESTRING('.length, -1)
        .split(',')
        .map((c) => c.trim().split(' ').map(Number));
}
