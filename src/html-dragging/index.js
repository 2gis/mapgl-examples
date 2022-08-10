const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

const draggableMarker = new mapgl.HtmlMarker(map, {
    coordinates: [55.31878, 25.23584],
    html: `<div class="marker"></div>`,
});

let dragging = false;

function dragStart() {
    dragging = true;
}
const markerContent = draggableMarker.getContent();
markerContent.addEventListener('mousedown', dragStart);
markerContent.addEventListener('touchstart', dragStart);

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
    dragging = false;
}
document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);
