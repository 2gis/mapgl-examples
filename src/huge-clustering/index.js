const defaultOptions = {
    markers: 10000,
    radius: 60,
};
const options = {
    ...defaultOptions,
    ...parseUrlQuery(),
};
const gui = new dat.GUI();
gui.add(options, 'markers', 0, 1000000, 1).onChange(applyNewOptions);
gui.add(options, 'radius', 0, 1000, 1).onFinishChange(applyNewOptions);
function applyNewOptions() {
    updateUrlQuery(options, defaultOptions);
    window.location.reload();
}

const center = [55.31878, 25.23584];

const map = new mapgl.Map('map', {
    center,
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    zoomControl: false,
});

const clusterer = new mapgl.Clusterer(map, {
    radius: options.radius,
});

const info = document.querySelector('#info');

const markers = [];

map.once('idle', async () => {
    info.innerHTML += `<div>Creating ${options.markers} markers</div>`;

    await waitForNextFrame();
    const markerCreatingTime = Date.now();
    for (let i = 0; i < options.markers; i++) {
        markers.push({
            coordinates: randomPosition(),
        });
    }
    info.innerHTML += `<div>Finish creating markers for ${Date.now() - markerCreatingTime}ms</div>`;
    const clusterCreatingTime = Date.now();
    info.innerHTML += `<div>Clustering markers</div>`;

    await waitForNextFrame();
    clusterer.load(markers);
    info.innerHTML += `<div>Finish clustering for ${Date.now() - clusterCreatingTime}ms</div>`;
});

function randomPosition() {
    const lng = center[0] + (0.5 - Math.random());
    const lat = center[1] + (0.5 - Math.random());
    return [lng, lat];
}
