const center = [55.31878, 25.23584];
const container = document.querySelector('#map');

const map = new mapgl.Map('map', {
    center,
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    zoomControl: false,
});

window.addEventListener('resize', () => map.invalidateSize());

map.on('styleload', () => {
    map.addLayer({
        type: 'point',
        id: 'geojson-point',
        filter: ['match', ['get', 'case'], ['point'], true, false],
        style: {
            ...style,
            textField: ['get', 'text'],
            textFont: ['match', ['get', 'drag'], [false], style.textFont, ''],
            allowOverlap: true,
        },
    });
});

let draggableLabel;
let draggablePointFeature;

const style = {
    textFont: 'Open_Sans',
    textFontSize: 16,
    textColor: '#00f',
    textHaloColor: '#000',
    textHaloWidth: 0.8,
};

const data = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                case: 'point',
                text: 'draggableLabel',
                drag: false,
            },
            geometry: {
                type: 'Point',
                coordinates: center,
            },
        },
    ],
};

const source = new mapgl.GeoJsonSource(map, {
    data,
});

const onStart = (e) => {
    if (e.targetData?.type === 'geojson') {
        const { feature } = e.targetData;
        const dataFeature = data.features.find((f) => {
            return f === feature;
        });

        if (dataFeature && dataFeature.properties) {
            draggablePointFeature = dataFeature;
            dataFeature.properties.drag = true;
            source.setData(data);
            draggableLabel = new mapgl.Label(map, {
                coordinates: dataFeature.geometry.coordinates,
                text: dataFeature.properties.text,
                font: style.textFont,
                fontSize: style.textFontSize,
                color: style.textColor,
                haloColor: style.textHaloColor,
                haloRadius: style.textHaloWidth,
            });
            map.setOption('disableDragging', true);
            container.addEventListener('mousemove', onMove);
            container.addEventListener('touchmove', onMove);
        }
    }
};

const onMove = (e) => {
    const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;
    draggableLabel?.setCoordinates(map.unproject([clientX, clientY]));
};

const onEnd = (e) => {
    container.removeEventListener('mousemove', onMove);
    container.removeEventListener('touchmove', onMove);
    if (draggablePointFeature && draggablePointFeature.properties) {
        const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;
        draggablePointFeature.properties.drag = false;
        draggablePointFeature.geometry.coordinates = map.unproject([clientX, clientY]);
    }
    source.setData(data);
    map.setOption('disableDragging', false);

    // Sets the timeout for the label destroying to avoid blinking so the GeoJSON point has time to appear.
    // You can adjust its value.
    setTimeout(() => {
        draggableLabel?.destroy();
        draggableLabel = undefined;
        draggablePointFeature = undefined;
    }, 100);
};

container.addEventListener('mouseout', onEnd);
document.addEventListener('mouseleave', onEnd);
document.addEventListener('mouseup', onEnd);
document.addEventListener('touchend', onEnd);

map.on('mousedown', onStart);
map.on('touchstart', onStart);
