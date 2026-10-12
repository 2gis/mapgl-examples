const map = new mapgl.Map('map', {
    center: [94, 63],
    zoom: 5,
    style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b', // 2GIS Day
    
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

// --- Sidebar ---
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');
toggleButton.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    toggleButton.textContent = collapsed ? '»' : '«';
    toggleButton.title = collapsed ? 'Показать панель' : 'Скрыть панель';
    setTimeout(() => map.invalidateSize(), 300);
});

// --- Settings ---
const settings = {
    bins: 6,
    opacity: 0.7,
    palette: 'yellowRed',
    hover: true,
};

const binsInput = document.getElementById('bins');
const binsValue = document.getElementById('bins-value');
binsInput.addEventListener('input', () => {
    settings.bins = Number(binsInput.value);
    binsValue.textContent = settings.bins;
    renderData();
});

const opacityInput = document.getElementById('opacity');
const opacityValue = document.getElementById('opacity-value');
opacityInput.addEventListener('input', () => {
    settings.opacity = Number(opacityInput.value) / 100;
    opacityValue.textContent = `${opacityInput.value}%`;
    renderLayer();
});

const paletteInput = document.getElementById('palette');
paletteInput.addEventListener('change', () => {
    settings.palette = paletteInput.value;
    renderLayer();
    updateBuckets();
});

const hoverInput = document.getElementById('hover');
hoverInput.addEventListener('change', () => {
    settings.hover = hoverInput.checked;
    if (!settings.hover) {
        clearHover();
    }
});

const styleInput = document.getElementById('map-style');
styleInput.addEventListener('change', () => {
    clearHover();
    map.setStyleById(styleInput.value);
});

// --- Choropleth rendering ---
const SOURCE_NAME = 'choropleth';
const LAYER_ID = 'choropleth-polygons';

let geojson = null;
let styleLoaded = false;
let layerAdded = false;
/** @type {mapgl.Polygon[]} overlay polygons drawn on top for hover */
let hoverPolygons = [];

// A single data source for the whole GeoJSON file
const source = new mapgl.GeoJsonSource(map, {
    data: {
        type: 'FeatureCollection',
        features: [],
    },
    attributes: {
        purpose: SOURCE_NAME,
    },
});

map.on('styleload', () => {
    styleLoaded = true;
    renderLayer();
});

fetch('./russia_regions.geojson')
    .then((r) => r.json())
    .then((data) => {
        geojson = data;
        renderData();
    });

/** Recomputes buckets and pushes the data to the single source. */
function renderData() {
    if (!geojson) {
        return;
    }
    updateBuckets();
    source.setData(geojson);
    renderLayer();
}

/** (Re)adds the single choropleth layer with a value-driven color expression. */
function renderLayer() {
    if (!styleLoaded || !geojson) {
        return;
    }
    if (layerAdded) {
        map.removeLayer(LAYER_ID);
        layerAdded = false;
    }
    map.addLayer({
        id: LAYER_ID,
        type: 'polygon',
        filter: ['match', ['sourceAttr', 'purpose'], [SOURCE_NAME], true, false],
        style: {
            color: buildColorExpression(),
        },
    });
    layerAdded = true;
}

/**
 * Builds a match expression that colors polygons by their `bucket` value.
 */
function buildColorExpression() {
    const alpha = Math.round(settings.opacity * 255)
        .toString(16)
        .padStart(2, '0');

    const color = ['match', ['get', 'bucket']];
    for (let i = 0; i < settings.bins; i++) {
        color.push([i], `${binColor(i, settings.bins)}${alpha}`);
    }
    color.push('#e0e0e0');

    return color;
}

/** Groups features into bins using a logarithmic scale. */
function updateBuckets() {
    if (!geojson) {
        return;
    }
    const populations = geojson.features.map((f) => f.properties.population);
    const logMin = Math.log10(Math.min(...populations));
    const logMax = Math.log10(Math.max(...populations));

    const binFeatures = Array.from({ length: settings.bins }, () => []);

    geojson.features.forEach((feature) => {
        const t =
            logMax === logMin
                ? 0
                : (Math.log10(feature.properties.population) - logMin) / (logMax - logMin);
        const bucket = Math.min(settings.bins - 1, Math.floor(t * settings.bins));
        feature.properties.bucket = bucket;
        binFeatures[bucket].push(feature);
    });

    renderLegend(binFeatures);
}

// --- Hover: draw a polygon overlay on top (see geojson-hover-polygon example) ---
map.on('mouseover', (ev) => {
    if (!settings.hover) {
        return;
    }
    clearHover();
    if (!ev.targetData || !ev.targetData.feature) {
        return;
    }
    const geometry = ev.targetData.feature.geometry;
    const polygons =
        geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
    hoverPolygons = polygons.map(
        (coordinates) =>
            new mapgl.Polygon(map, {
                coordinates,
                interactive: false,
                color: '#00000033',
                strokeColor: '#ffffff',
                strokeWidth: 1.5,
            }),
    );
});

map.on('mouseout', clearHover);

function clearHover() {
    hoverPolygons.forEach((polygon) => polygon.destroy());
    hoverPolygons = [];
}

/**
 * Color palettes (low value → high value) as lists of color stops.
 */
const PALETTES = {
    yellowRed: ['#fee7bd', '#b30000'],
    greenBlue: ['#d9f0d3', '#41ab5d', '#08519c'],
    purple: ['#f2f0f7', '#54278f'],
    blues: ['#deebf7', '#08306b'],
    spectral: ['#3288bd', '#99d594', '#e6f598', '#fee08b', '#fc8d59', '#d53e4f'],
};

/**
 * Returns a color from the active palette for the given bin index.
 */
function binColor(index, total) {
    const stops = PALETTES[settings.palette] || PALETTES.yellowRed;
    const t = total > 1 ? index / (total - 1) : 0.5;
    const scaled = t * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(scaled));
    return mixColor(stops[i], stops[i + 1], scaled - i);
}

/**
 * Linear interpolation between two hex colors.
 */
function mixColor(from, to, t) {
    const a = hexToRgb(from);
    const b = hexToRgb(to);
    const mix = a.map((c, i) => Math.round(c + (b[i] - c) * t));
    return '#' + mix.map((c) => c.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex) {
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function renderLegend(binFeatures) {
    const legend = document.getElementById('legend');
    legend.innerHTML = '';
    binFeatures
        .map((features, index) => ({ features, index }))
        .filter(({ features }) => features.length)
        .reverse()
        .forEach(({ features, index }) => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            const swatch = document.createElement('span');
            swatch.className = 'legend-swatch';
            swatch.style.background = binColor(index, settings.bins);
            const text = document.createElement('span');
            const values = features.map((f) => f.properties.population);
            text.textContent = `${formatNumber(Math.min(...values))} — ${formatNumber(Math.max(...values))}`;
            item.append(swatch, text);
            legend.appendChild(item);
        });
}

function formatNumber(value) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)} млн`;
    }
    if (value >= 1_000) {
        return `${Math.round(value / 1_000)} тыс`;
    }
    return String(value);
}
