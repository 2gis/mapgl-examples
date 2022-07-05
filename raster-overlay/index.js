const map = new mapgl.Map('map', {
    center: [37.56983, 55.72474],
    zoom: 13,
    pitch: 15,
    rotation: -5,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

const raster = new mapgl.Raster(map, {
    bounds: {
        northEast: [37.63154227503786, 55.748852821953406],
        southWest: [37.523738926485365, 55.704771632226],
    },
    image: {
        url: './raster.jpg',
    },
    opacity: 0.8,
});
