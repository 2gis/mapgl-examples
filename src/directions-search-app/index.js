// API key can be used on 2gis.github.io/mapgl-examples only!
const key = 'a1893935-6834-4445-b97a-3405fb426c5b';

// Probably you don't need that. It's only for codepent js linter.
const mapgl = window.mapgl;

const map = new mapgl.Map('map', {
    center: [82.89, 55.03],
    zoom: 11,
    key,
});

let directionsResult = [];
let drawnRoutes = [];
let activeRouteIndex = 0;

const directionItemSelector = document.getElementById('active-direction');
directionItemSelector.addEventListener('change', () => {
    activeRouteIndex = Number(directionItemSelector.value);
    redrawRoutes();
});

const directionTypeSelector = document.getElementById('direction-type');
directionTypeSelector.addEventListener('change', () => {
    activeRouteIndex = 0;
    directionItemSelector.value = 0;
    getDirection(directionTypeSelector.value);
});

getDirection(directionTypeSelector.value);

const colorSchemes = {
    active: {
        ignore: '#0f6ec1',
        pedestrian: '#626262',
        normal: '#ffc402',
        fast: '#22aa01',
        slow: '#ed2301',
        'slow-jams': '#851705',
    },
    inactive: {
        ignore: '#afafaf',
        pedestrian: '#afafaf',
        normal: '#afafaf',
        fast: '#afafaf',
        slow: '#afafaf',
        'slow-jams': '#afafaf',
    },
};

function getQuery(type) {
    switch (type) {
        case 'truck':
            return {
                type: 'truck_jam',
                point_a_name: 'Source',
                point_b_name: 'Target',
                locale: 'en',
                points: [
                    {
                        x: 82.89292907608393,
                        y: 54.97627879743042,
                        type: 'pedo',
                    },
                    {
                        x: 82.98578346481848,
                        y: 55.04401529088645,
                        type: 'pedo',
                    },
                ],
                truck_params: {
                    length: 9,
                    height: 2.7,
                    width: 2.5,
                    mass: 20,
                    max_perm_mass: 20,
                    axle_load: 8,
                },
            };
        default:
            return {
                type: 'jam',
                point_a_name: 'Source',
                point_b_name: 'Target',
                locale: 'en',
                points: [
                    {
                        x: 82.89292907608393,
                        y: 54.97627879743042,
                        type: 'pedo',
                    },
                    {
                        x: 82.98578346481848,
                        y: 55.04401529088645,
                        type: 'pedo',
                    },
                ],
            };
    }
}

function getDirection(type) {
    return fetch(`https://catalog.api.2gis.ru/${type}/6.0.0/global?key=${key}`, {
        method: 'post',
        body: JSON.stringify(getQuery(type)),
    })
        .then((r) => {
            if (r.status !== 200) {
                throw new Error(`HTTP code is ${r.status}`);
            }
            return r.json();
        })
        .then((r) => {
            directionsResult = Array.isArray(r.result) ? r.result : [];

            directionItemSelector.innerHTML = directionsResult.reduce((agg, r, ind) => {
                return agg + `<option value="${ind}">${ind}</option>`;
            }, '');

            directionItemSelector.value = activeRouteIndex;
            redrawRoutes();
        });
}

function redrawRoutes() {
    drawnRoutes.forEach((r) => {
        r.polylines.forEach((p) => {
            p.off('click');
            p.destroy();
        });
    });

    drawnRoutes = [];

    directionsResult.forEach((r, ind) => {
        drawnRoutes.push(drawRoute(r, ind));
    });
}

const onPolylineClick = (e) => {
    activeRouteIndex = e.targetData.userData.routeIndex ?? 0;
    directionItemSelector.value = activeRouteIndex;
    redrawRoutes();
};

function drawRoute(route, index) {
    const drawnRoute = { polylines: [] };
    const isActive = index === activeRouteIndex;
    const colorScheme = colorSchemes[isActive ? 'active' : 'inactive'];
    const zIndexDelta = isActive ? 1 : 0;

    if (route.begin_pedestrian_path) {
        const p = new mapgl.Polyline(map, {
            coordinates: parserLineStringWKT(route.begin_pedestrian_path.geometry.selection),
            zIndex: 1 + zIndexDelta,
            zIndex2: 0 + zIndexDelta,
            color: colorScheme.pedestrian,
            color2: '#ffffff',
            width: 5,
            width2: 8,
            userData: { routeIndex: index },
        });

        p.on('click', onPolylineClick);

        drawnRoute.polylines.push(p);
    }

    if (route.end_pedestrian_path) {
        const p = new mapgl.Polyline(map, {
            coordinates: parserLineStringWKT(route.end_pedestrian_path.geometry.selection),
            zIndex: 1 + zIndexDelta,
            zIndex2: 0 + zIndexDelta,
            color: colorScheme.pedestrian,
            color2: '#ffffff',
            width: 5,
            width2: 8,
            userData: { routeIndex: index },
        });

        p.on('click', onPolylineClick);

        drawnRoute.polylines.push(p);
    }

    route.maneuvers.forEach((maneuver) => {
        if (maneuver.outcoming_path) {
            maneuver.outcoming_path.geometry.forEach((geometry) => {
                const p = new mapgl.Polyline(map, {
                    coordinates: parserLineStringWKT(geometry.selection),
                    zIndex: 1 + zIndexDelta,
                    zIndex2: 0 + zIndexDelta,
                    color: colorScheme[geometry.color],
                    color2: '#ffffff',
                    width: 5,
                    width2: 8,
                    userData: { routeIndex: index },
                });

                p.on('click', onPolylineClick);

                drawnRoute.polylines.push(p);
            });
        }
    });

    return drawnRoute;
}

function parserLineStringWKT(wkt) {
    return wkt
        .slice('LINESTRING('.length, -1)
        .split(',')
        .map((c) => c.trim().split(' ').map(Number));
}
