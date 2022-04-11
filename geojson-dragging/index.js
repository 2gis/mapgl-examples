const center = [55.31878, 25.23584];
const map = new mapgl.Map('map', {
    center,
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    zoomControl: false,
    style: 'ef7f7b8c-7f8f-43ca-8f94-1f3152e922a7', // The custom style is used because we need custom marker icons.
});

window.addEventListener('resize', () => map.invalidateSize());

/**
 * Generates GeoJSON data as an array of points.
 * 
 * A draggable feature has the following structure:
 * ```js
 *  {
 *      type: 'Feature',
 *      properties: {
 *          case: 'draggable',
 *          text: 'I can be dragged',
 *          dragging: false,
 *      },
 *      geometry: {
 *          type: 'Point',
 *          coordinates,
 *      },
 *  }
 * ```
 * 
 * And a non draggable feature structure is a little simpler:
 * ```js
 *  {
 *      type: 'Feature',
 *      properties: {
 *          case: 'nondraggable',
 *          text: `I can't be dragged`,
 *      },
 *      geometry: {
 *          type: 'Point',
 *          coordinates,
 *      },
 *  }
 * ```
 * @param number A number of generated points.
 * @param center Geographical coordinates around which the points should be located in range [-0.1, 0.1) from them.
 */
function generateGeoJSONData(number, center) {
    const features = [];
    for (let i = 0; i < number; i++) {
        const coordinates = [center[0] - 0.1 + Math.random() * 0.2, center[1] - 0.1 + Math.random() * 0.2];
        const isDraggable = i % 3 === 0;
        const point = {
            type: 'Feature',
            properties: {
                case: isDraggable ? 'draggable' : 'nondraggable',
                text: isDraggable ? 'I can be dragged' : `I can't be dragged`,
            },
            geometry: {
                type: 'Point',
                coordinates,
            },
        };

        if (isDraggable) {
            point.properties['dragging'] = false;
        }

        features.push(point);
    }

    return {
        type: 'FeatureCollection',
        features,
    }
}

const style = {
    iconWidth: 48,
    textFont: 'Open_Sans',
    textFontSize: 16,
    textColor: '#000',
    textHaloColor: '#fff',
    textHaloWidth: 1.2,
};

map.on('styleload', () => {
    map.addLayer({
        type: 'point',
        id: 'geojson-point-draggable',
        filter: ['match', ['get', 'case'], ['draggable'], true, false],
        style: {
            ...style,
            iconImage: ['match', ['get', 'dragging'], [false], 'marker-green', ''],
            textField: ['get', 'text'],
            textFont: ['match', ['get', 'dragging'], [false], style.textFont, ''],
            allowOverlap: true,
        },
    });

    map.addLayer({
        type: 'point',
        id: 'geojson-point-nondraggable',
        filter: ['match', ['get', 'case'], ['nondraggable'], true, false],
        style: {
            ...style,
            iconImage: 'marker-red',
            textField: ['get', 'text'],
            textFont: style.textFont,
            allowOverlap: true,
        },
    });
});

let currDraggableMarker;
let draggablePointFeature;
const prevDraggableMarkers = [];

const data = generateGeoJSONData(25, center);
const source = new mapgl.GeoJsonSource(map, {
    data,
});

const onStart = (e) => {
    if (e.targetData?.type === 'geojson') {
        const { feature } = e.targetData;
        const dataFeature = data.features.find((f) => {
            return f === feature;
        });

        if (dataFeature?.properties && dataFeature.properties.dragging !== undefined) {
            draggablePointFeature = dataFeature;
            dataFeature.properties.dragging = true;
            source.setData(data);

            if (currDraggableMarker) {
                prevDraggableMarkers.push(currDraggableMarker);
            }

            currDraggableMarker = new mapgl.Marker(map, {
                coordinates: dataFeature.geometry.coordinates,
                icon: './marker-green.svg',
                size: [style.iconWidth, style.iconWidth],
                label: {
                    text: dataFeature.properties.text,
                    fontSize: style.textFontSize,
                    color: style.textColor,
                    haloColor: style.textHaloColor,
                    haloRadius: style.textHaloWidth,
                    offset: [0, 34],
                },
            });

            map.setOption('disableDragging', true);
            document.addEventListener('mousemove', onMove);
            document.addEventListener('touchmove', onMove);
        }
    }
};

const onMove = (e) => {
    const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;
    currDraggableMarker?.setCoordinates(map.unproject([clientX, clientY]));
};

const onEnd = (e) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);

    if (
        draggablePointFeature?.properties &&
        draggablePointFeature.properties.dragging !== undefined
    ) {
        const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.changedTouches[0].clientY;
        draggablePointFeature.properties.dragging = false;
        draggablePointFeature.geometry.coordinates = map.unproject([clientX, clientY]);
    }

    source.setData(data);
    map.setOption('disableDragging', false);
    draggablePointFeature = undefined;

    // Sets the timeout for the label destroying to avoid blinking so the GeoJSON point has time to appear.
    // You can adjust its value.
    setTimeout(() => {
        if (prevDraggableMarkers.length) {
            prevDraggableMarkers.forEach((m) => {
                m.destroy();
            });
            prevDraggableMarkers.length = 0;
        } else {
            currDraggableMarker?.destroy();
            currDraggableMarker = undefined;
        }
    }, 100);
};

document.addEventListener('mouseup', onEnd);
document.addEventListener('touchend', onEnd);

map.on('mousedown', onStart);
map.on('touchstart', onStart);
