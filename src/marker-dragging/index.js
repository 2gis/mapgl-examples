const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

const draggableMarker = new mapgl.Marker(map, {
    coordinates: [55.31878, 25.23584],
    label: {
        text: 'Draggable marker',
    },
});

let dragging = false;

function dragStart() {
    dragging = true;
    map.setOption('disableDragging', true);
}
draggableMarker.on('mousedown', dragStart);
draggableMarker.on('touchstart', dragStart);

function dragMove(e) {
    if (!dragging) {
        return;
    }
    const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;
    draggableMarker.setCoordinates(map.unproject([clientX, clientY]));
}
document.addEventListener('mousemove', dragMove);
document.addEventListener('touchmove', dragMove);

function dragEnd() {
    map.setOption('disableDragging', false);
    dragging = false;
}
document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);
