const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});

let polygon;
function updatePolygon(additionalPoint) {
    if (polygon) {
        polygon.destroy();
    }
    polygon = new mapgl.Polygon(map, {
        coordinates: additionalPoint ? [[...coordinates, additionalPoint]] : [coordinates],
        interactive: false,
    });
}

let coordinates = [];

document.querySelector('#finish').addEventListener('click', () => {
    updatePolygon();
    alert(JSON.stringify(coordinates));
});
document.querySelector('#reset').addEventListener('click', () => {
    coordinates = [];
    updatePolygon();
});

const mapContainer = document.querySelector('#map');
mapContainer.addEventListener('click', (ev) => {
    const lngLat = map.unproject([ev.clientX, ev.clientY]);
    coordinates.push(lngLat);
    updatePolygon();
});
mapContainer.addEventListener('mousemove', (ev) => {
    const lngLat = map.unproject([ev.clientX, ev.clientY]);
    updatePolygon(lngLat);
});
mapContainer.addEventListener('mouseout', (ev) => {
    updatePolygon();
});
