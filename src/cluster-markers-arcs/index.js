const map = new mapgl.Map('map', {
    center: [55.255188, 25.215744],
    zoom: 16.5,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
  <circle fill="#0000ff" cx="5" cy="5" r="5"/>
  <circle fill="#ffffff" cx="5" cy="5" r="2"/>
</svg>`;

function createArcGeometry(lngLatCenter, rotation, fov, radiusInMeters) {
    const lineString = turf.lineArc(
        lngLatCenter,
        radiusInMeters / 1000,
        rotation - fov / 2,
        rotation + fov / 2,
    );
    const ring = lineString.geometry.coordinates;
    if (fov < 360) {
        ring.unshift(lngLatCenter);
        ring.push(lngLatCenter);
    }
    return [ring];
}

const cameras = [
    {
        lngLat: [55.255362479893996, 25.217728948395333],
        rotation: 35,
        fov: 360,
        radius: 100,
    },
    {
        lngLat: [55.25427208651889, 25.216377105791935],
        rotation: 290,
        fov: 60,
        radius: 200,
    },
    {
        lngLat: [55.25617017872204, 25.215171396597043],
        rotation: 260,
        fov: 45,
        radius: 150,
    },
    {
        lngLat: [55.25728076495804, 25.216541519824702],
        rotation: 220,
        fov: 120,
        radius: 150,
    },
    {
        lngLat: [55.25409035473208, 25.215408885647165],
        rotation: 160,
        fov: 45,
        radius: 150,
    },
    {
        lngLat: [55.25479709160864, 25.213289737407905],
        rotation: 40,
        fov: 45,
        radius: 150,
    },
    {
        lngLat: [55.24881499153622, 25.212762553741825],
        rotation: 40,
        fov: 45,
        radius: 150,
    },
];

cameras.forEach((camera) => {
    camera.fovCoordinates = createArcGeometry(
        camera.lngLat,
        camera.rotation,
        camera.fov,
        camera.radius,
    );
});

const clustringZoom = 15;

const clusterer = new mapgl.Clusterer(map, {
    radius: 60,
    disableClusteringAtZoom: clustringZoom,
});

clusterer.load(
    cameras.map((camera, index) => ({
        coordinates: camera.lngLat,
        icon: 'data:image/svg+xml;base64,' + btoa(icon),
        anchor: [8, 8],
        size: [16, 16],
        label: {
            text: index + 1,
            offset: [0, 18],
            color: '#0000ff',
            haloRadius: 1,
        },
    })),
);

let polygons = [];

function updatePolygons() {
    const zoom = map.getZoom();

    if (zoom >= clustringZoom) {
        if (!polygons.length) {
            cameras.forEach((camera) => {
                const polygon = new mapgl.Polygon(map, {
                    coordinates: camera.fovCoordinates,
                    color: '#0000ff66',
                    strokeColor: '#0000ff66',
                    strokeWidth: 1,
                });

                function onclick() {
                    alert('Camera:\n' + JSON.stringify(camera, null, 2));
                }
                polygon.on('click', onclick);
                polygons.push(polygon);
            });
        }
    } else {
        if (polygons.length) {
            polygons.forEach((polygon) => polygon.destroy());
            polygons = [];
        }
    }
}

updatePolygons();
map.on('move', updatePolygons);
