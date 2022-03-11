/**
 * The worke is a simulation of a backend that sends markers to the client filtered by viewport and zoom.
 */

const center = [55.31878, 25.23584];
const allMarkerCount = 1000000;
const markers = [];

onmessage = (ev) => {
    const { bounds, zoom } = ev.data;

    expandBounds(bounds, 1.2);

    if (!markers.length) {
        for (let i = 0; i < allMarkerCount; i++) {
            markers.push({
                type: 'Feature',
                properties: {
                    type: i % 5 ? 'separate' : 'single',
                    text: i,
                },
                geometry: {
                    type: 'Point',
                    coordinates: randomPosition(),
                },
            });
        }
    }

    console.group('Getting backend markers');
    const filterByBoundsTime = Date.now();
    let features = filterByBounds(markers, bounds);
    console.log(
        `${features.length} markers left after filtering by bounds ${features.length} (${
            Date.now() - filterByBoundsTime
        }ms)`,
    );

    const filterByZoomTime = Date.now();
    features = filterByZoom(features, zoom);
    console.log(
        `${features.length} markers left after filtering by zoom (${
            Date.now() - filterByZoomTime
        }ms)`,
    );

    console.groupEnd();

    const geojson = {
        type: 'FeatureCollection',
        features,
    };

    postMessage(geojson);
};

function filterByBounds(markers, bounds) {
    return markers.filter(
        (marker) =>
            marker.geometry.coordinates[0] <= bounds.northEast[0] &&
            marker.geometry.coordinates[0] >= bounds.southWest[0] &&
            marker.geometry.coordinates[1] <= bounds.northEast[1] &&
            marker.geometry.coordinates[1] >= bounds.southWest[1],
    );
}

function expandBounds(bounds, scale) {
    const center = [
        bounds.southWest[0] + (bounds.northEast[0] - bounds.southWest[0]) / 2,
        bounds.southWest[1] + (bounds.northEast[1] - bounds.southWest[1]) / 2,
    ];

    bounds.northEast[0] = center[0] + (bounds.northEast[0] - center[0]) * scale;
    bounds.northEast[1] = center[1] + (bounds.northEast[1] - center[1]) * scale;

    bounds.southWest[0] = center[0] - (center[0] - bounds.southWest[0]) * scale;
    bounds.southWest[1] = center[1] - (center[1] - bounds.southWest[1]) * scale;
}

function filterByZoom(markers, zoom) {
    const grid = new Map(); // x_y → n
    const step = (2 ** -Math.ceil(zoom) * 360) / 2;

    return markers.filter((marker) => {
        const {
            geometry: { coordinates },
        } = marker;
        const x = Math.round(coordinates[0] / step);
        const y = Math.round(coordinates[1] / step);

        const hash = x * 2 ** 10 + y;
        const cellMarkers = grid.get(hash) || 0;
        if (cellMarkers > 5) {
            return false;
        }

        grid.set(hash, cellMarkers + 1);
        return true;
    });
}

function randomPosition() {
    const lng = center[0] + (0.5 - Math.random());
    const lat = center[1] + (0.5 - Math.random());
    return [lng, lat];
}
