const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 11,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

map.on('styleload', () => {
    map.addLayer({
        id: 'my-polygon',
        type: 'polygon',
        filter: [
            'all',
            ['match', ['sourceAttr', 'type'], ['my-source'], true, false],
            ['match', ['get', 'geotype'], ['polygon'], true, false],
        ],
        style: {
            color: '#ff000088',
        },
    });

    map.addLayer({
        id: 'my-point',
        type: 'point',
        filter: [
            'all',
            ['match', ['sourceAttr', 'type'], ['my-source'], true, false],
            ['match', ['get', 'geotype'], ['point'], true, false],
        ],
        style: {
            iconImage: 'ent_i',
            textFont: 'Noto_Sans',
            textField: ['get', 'text'],
            allowOverlap: true,
        },
    });
});

const startLat = 25.27837875347788;
const endLat = 25.186451538414246;

const source = new mapgl.GeoJsonSource(map, {
    attributes: {
        type: 'my-source',
    },
    data: createGeoJson(startLat),
});

let currentIteration = 0;
const iterations = 20;

function updatePosition() {
    currentIteration = (currentIteration + 1) % iterations;

    const t = currentIteration / iterations;
    const lat = startLat + (endLat - startLat) * t;

    source.setData(createGeoJson(lat));
}

setInterval(updatePosition, 2000);

function createGeoJson(latitude) {
    return {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    geotype: 'point',
                    text: 'Moving point',
                },
                geometry: {
                    type: 'Point',
                    coordinates: [55.38332467842971, latitude],
                },
            },
            {
                type: 'Feature',
                properties: {
                    geotype: 'point',
                    text: 'Static point ' + Math.random().toFixed(3),
                },
                geometry: {
                    type: 'Point',
                    coordinates: [55.28332467842971, 25.32837875347788],
                },
            },
            {
                type: 'Feature',
                properties: {
                    geotype: 'polygon',
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: createPolygon(55.184884124349765, latitude),
                },
            },
        ],
    };
}

function createPolygon(lng, lat) {
    const c = [lng, lat];
    return [
        [
            [c[0] - 0.05, c[1]],
            [c[0], c[1] - 0.05],
            [c[0] + 0.05, c[1]],
            [c[0], c[1] + 0.05],
            [c[0] - 0.05, c[1]],
        ],
    ];
}
