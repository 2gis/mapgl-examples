const backend = new Worker('./backend.js');
const center = [55.31878, 25.23584];

const map = new mapgl.Map('map', {
    center,
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!

    /**
     * The special style with a layer with a stretchable image for markers.
     * You can copy it by link https://styles.2gis.com/preview/f93651b1-f77c-4771-8c78-843e50689682?allowCopy=-502869321
     * and see Marker layer there.
     * After 2022 Q2 we'll support adding stretchable images by API calling and the style will no longer needed.
     */
    style: 'f93651b1-f77c-4771-8c78-843e50689682',
});
window.addEventListener('resize', () => map.invalidateSize());

const source = new mapgl.GeoJsonSource(map, {
    attributes: { id: 'markers' },
    data: { type: 'FeatureCollection', features: [] },
});

backend.onmessage = (ev) => {
    source.setData(ev.data);
};

map.once('styleload', () => {
    // The markers layer with separate icons and labels
    map.addLayer({
        id: 'my-markers',
        type: 'point',
        filter: [
            'all',
            ['match', ['sourceAttr', 'id'], ['markers'], true, false],
            ['match', ['get', 'type'], ['separate'], true, false],
        ],
        style: {
            iconImage: 'home_hover',
            textField: ['get', 'text'],
            textFont: 'Noto_Sans',
            textFontSize: 13,
            textHaloWidth: 1,
            textHaloColor: '#fff',
            iconLabelingGroup: 'markers',
            textLabelingGroup: 'markers',
        },
    });
});

function fetchMarkers() {
    backend.postMessage({
        bounds: map.getBounds(),
        zoom: map.getZoom(),
    });
}

map.on('moveend', fetchMarkers);
fetchMarkers();
