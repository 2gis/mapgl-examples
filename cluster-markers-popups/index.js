const center = [55.31878, 25.23584];

const map = new mapgl.Map('map', {
    center,
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

const markers = [];

for (let i = 0; i < 1000; i++) {
    markers.push({
        coordinates: randomPosition(),
        userData: {
            markerIndex: i,
        },
    });
}
const clusterer = new mapgl.Clusterer(map);
clusterer.load(markers);

clusterer.on('click', (ev) => {
    if (ev.target.type === 'marker') {
        showPopup(ev.target.data);
    } else {
        hidePopup();
    }
});
map.on('click', hidePopup);
map.on('zoom', hidePopup);

let popup;
function showPopup({ coordinates, userData }) {
    popup?.destroy();
    popup = new mapgl.HtmlMarker(map, {
        coordinates,
        html: `<div class="popup">
            <div class="popup-content">
                This is a popup for the #${userData.markerIndex} marker
            </div>
            <div class="popup-tip"></div>
        </div>`,
    });
}
function hidePopup() {
    popup?.destroy();
    popup = undefined;
}

function randomPosition() {
    const lng = center[0] + (0.5 - Math.random());
    const lat = center[1] + (0.5 - Math.random());
    return [lng, lat];
}
