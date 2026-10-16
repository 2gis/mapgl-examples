const map = new mapgl.Map('map', {
    center: [94, 63],
    zoom: 5,
    style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b', // 2GIS Day
    key: '4970330e-7f1c-4921-808c-0eb7c4e63001',
    // key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
});
window.addEventListener('resize', () => map.invalidateSize());

// --- Sidebar ---
const sidebar = document.getElementById('sidebar');
const sidebarEmpty = document.getElementById('sidebar-empty');
const sidebarControls = document.getElementById('sidebar-controls');
const scenarioTitle = document.getElementById('sidebar-scenario-title');
const mapSearch = document.getElementById('map-search');
const mapSearchInput = document.getElementById('map-search-input');
const mapSearchSuggestions = document.getElementById('map-search-suggestions');
const mapSearchClear = document.getElementById('map-search-clear');
const selectionPanel = document.getElementById('selection-panel');
const selectionList = document.getElementById('selection-list');
const selectionEmpty = document.getElementById('selection-empty');
const citiesPanel = document.getElementById('cities-panel');
const citiesList = document.getElementById('cities-list');
const toggleButton = document.getElementById('sidebar-toggle');
toggleButton.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    toggleButton.textContent = collapsed ? '»' : '«';
    toggleButton.title = collapsed ? 'Показать панель' : 'Скрыть панель';
    setTimeout(() => map.invalidateSize(), 300);
});

// --- Welcome dialog ---
const welcome = document.getElementById('welcome');
const welcomeOpen = document.getElementById('welcome-open');

function closeWelcome() {
    welcome.classList.add('hidden');
    welcomeOpen.classList.remove('hidden');
}

function openWelcome() {
    welcome.classList.remove('hidden');
    welcomeOpen.classList.add('hidden');
}

document.getElementById('welcome-close').addEventListener('click', closeWelcome);
welcomeOpen.addEventListener('click', openWelcome);
document.getElementById('sidebar-open-scenarios').addEventListener('click', openWelcome);
welcome.addEventListener('click', (ev) => {
    if (ev.target === welcome) {
        closeWelcome();
    }
});
document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && !welcome.classList.contains('hidden')) {
        closeWelcome();
    }
});
document.querySelectorAll('.case-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
        const id = tile.dataset.case;
        activeCase = id;
        clearHover();
        clearSearch();
        updateSidebarVisibility();
        renderLayer();
        closeWelcome();
    });
});

/** Shows render settings only after a scenario has been picked. */
function updateSidebarVisibility() {
    sidebarControls.classList.toggle('hidden', !activeCase);
    sidebarEmpty.classList.toggle('hidden', !!activeCase);
    // Controls marked with `data-cases` are shown only for those scenarios.
    document.querySelectorAll('#sidebar-controls [data-cases]').forEach((section) => {
        const cases = section.dataset.cases.split(/\s+/);
        section.classList.toggle('hidden', !cases.includes(activeCase));
    });
    // Reflect the active scenario name in the sidebar header.
    const title = activeCase
        ? document.querySelector(`.case-tile[data-case="${activeCase}"] .case-title`)?.textContent
        : null;
    scenarioTitle.textContent = title || 'Сценарий не выбран';
    // The search field is only shown for the “search” scenario.
    mapSearch.classList.toggle('hidden', activeCase !== 'search');
    // The selection list is only shown for the “selection” scenario.
    selectionPanel.classList.toggle('hidden', activeCase !== 'selection');
    renderSelectionList();
    // The cities list is only shown for the “blocks” scenario.
    citiesPanel.classList.toggle('hidden', activeCase !== 'blocks');
    renderCitiesList();
}

// --- GeoJSON loading progress ---
const loadBar = document.getElementById('load-bar');
const loadPercent = document.getElementById('load-percent');
const loadStatus = document.getElementById('load-status');

function setProgress(received, total) {
    if (total) {
        const percent = Math.min(100, Math.round((received / total) * 100));
        loadBar.classList.remove('indeterminate');
        loadBar.style.width = `${percent}%`;
        loadPercent.textContent = `${percent}%`;
        loadStatus.textContent = `${formatBytes(received)} из ${formatBytes(total)}`;
    } else {
        loadBar.classList.add('indeterminate');
        loadPercent.textContent = '';
        loadStatus.textContent = `Загружено ${formatBytes(received)}`;
    }
}

function finishLoading() {
    loadBar.classList.remove('indeterminate');
    loadBar.style.width = '100%';
    loadPercent.textContent = '100%';
    loadStatus.textContent = 'Данные GeoJSON загружены и отрисованы';
}

/**
 * Switches the progress bar to a "working" stage. Parsing and generating the
 * source (`setData`) are synchronous, blocking operations, so exact progress
 * cannot be measured — an animated "indeterminate" bar is shown instead.
 */
function startWorkStage(label) {
    loadBar.classList.add('indeterminate');
    loadPercent.textContent = '…';
    loadStatus.textContent = label;
}

/** Resolves on the next animation frame, letting the browser repaint. */
function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
}

/**
 * Resolves when the map reports it is idle — i.e. all pending updates, tiles and
 * data tiles have been rendered. Processing a large GeoJSON source happens in a
 * worker after `setData` returns, so the layer becomes visible only on a later
 * frame; waiting for `idle` ties the progress bar to what the user actually
 * sees. A timeout is used as a safety net.
 */
function waitForIdle(timeout = 20000) {
    return new Promise((resolve) => {
        let settled = false;
        const finish = () => {
            if (settled) {
                return;
            }
            settled = true;
            clearTimeout(timer);
            map.off('idle', finish);
            resolve();
        };
        const timer = setTimeout(finish, timeout);
        map.once('idle', finish);
    });
}

function formatBytes(bytes) {
    if (bytes >= 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
    }
    if (bytes >= 1024) {
        return `${Math.round(bytes / 1024)} КБ`;
    }
    return `${bytes} Б`;
}

/** Streams the file so progress can be reported while downloading. */
async function loadGeoJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const total = Number(response.headers.get('Content-Length')) || 0;
    setProgress(0, total);

    if (!response.body) {
        const data = await response.json();
        return data;
    }

    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    for (;;) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
        received += value.length;
        setProgress(received, total);
    }
    loadStatus.textContent = 'Разбор данных GeoJSON…';
    startWorkStage('Разбор данных GeoJSON…');
    const text = await new Blob(chunks).text();
    return JSON.parse(text);
}

// --- Settings ---
/** Id of the selected scenario tile, or `null` until one is picked. */
let activeCase = null;

const settings = {
    bins: 6,
    opacity: 0.7,
    palette: 'yellowRed',
    hover: true,
    tooltip: true,
    strokeWidth: 1,
    regionColor: '#bdbdbd',
    districtColor: '#5b8fc9',
    selectionColor: '#2e7d32',
    searchColor: '#6a1b9a',
    blocksFillOut: '#ff0000',
    blocksFillIn: '#f5e6b8',
    blocksStrokeColor: '#ff0000',
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

const strokeWidthInput = document.getElementById('stroke-width');
const strokeWidthValue = document.getElementById('stroke-width-value');
strokeWidthInput.addEventListener('input', () => {
    settings.strokeWidth = Number(strokeWidthInput.value);
    strokeWidthValue.textContent = settings.strokeWidth;
    renderLayer();
});

const regionColorInput = document.getElementById('region-color');
regionColorInput.addEventListener('input', () => {
    settings.regionColor = regionColorInput.value;
    renderLayer();
});

const districtColorInput = document.getElementById('district-color');
districtColorInput.addEventListener('input', () => {
    settings.districtColor = districtColorInput.value;
    renderLayer();
});

const selectionColorInput = document.getElementById('selection-color');
selectionColorInput.addEventListener('input', () => {
    settings.selectionColor = selectionColorInput.value;
    renderLayer();
});

const searchColorInput = document.getElementById('search-color');
searchColorInput.addEventListener('input', () => {
    settings.searchColor = searchColorInput.value;
    renderLayer();
});

const blocksFillOutInput = document.getElementById('blocks-fill-out');
blocksFillOutInput.addEventListener('input', () => {
    settings.blocksFillOut = blocksFillOutInput.value;
    renderLayer();
});

const blocksFillInInput = document.getElementById('blocks-fill-in');
blocksFillInInput.addEventListener('input', () => {
    settings.blocksFillIn = blocksFillInInput.value;
    renderLayer();
});

const blocksStrokeInput = document.getElementById('blocks-stroke');
blocksStrokeInput.addEventListener('input', () => {
    settings.blocksStrokeColor = blocksStrokeInput.value;
    renderLayer();
});
const hoverInput = document.getElementById('hover');
hoverInput.addEventListener('change', () => {
    settings.hover = hoverInput.checked;
    if (!settings.hover) {
        clearHover();
    }
});

const tooltipInput = document.getElementById('tooltip');
tooltipInput.addEventListener('change', () => {
    settings.tooltip = tooltipInput.checked;
    if (!settings.tooltip) {
        hideTooltip();
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
/** At/below this zoom the detail scenario shows ADM1, above it — ADM2. */
const DETAIL_ZOOM = 7;

let geojson = null;
let styleLoaded = false;
/** Ids of the scenario layers currently added to the map. */
let addedLayers = [];
/** @type {mapgl.Polygon[]} overlay polygons drawn on top for hover */
let hoverPolygons = [];
/**
 * Lookup of every `region`/`district` value found in the data.
 * Maps the place name to its type (`'region'` | `'district'`) and the bounding
 * box of its geometry (used to fly to the place when it is searched).
 * @type {Map<string, { type: string, bounds: { southWest: [number, number], northEast: [number, number] } }>}
 */
const placeIndex = new Map();

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

// Initialise the style-state keys so expressions reading them never see `null`
// (`null === null` would otherwise match features without a name).
map.patchStyleState({ selectGeo: '', selectedRegions: [] });

init();

async function init() {
    try {
        const data = await loadGeoJson('./Russia_all_v2.geojson');
        geojson = data;
        buildPlaceIndex(data);
        // Let the browser paint the finished download before the blocking
        // source-generation step begins.
        startWorkStage('Построение источника данных…');
        await nextFrame();
        updateBuckets();
        source.setData(geojson);
        renderLayer();
        fitToData();
        // The source is processed asynchronously; wait until the map has
        // actually drawn it before reporting completion.
        startWorkStage('Отрисовка данных на карте…');
        await waitForIdle();
        finishLoading();
    } catch (err) {
        loadStatus.textContent = 'Не удалось загрузить данные GeoJSON';
        console.error(err);
    }
}

/** Recomputes buckets and pushes the data to the single source. */
function renderData() {
    if (!geojson) {
        return;
    }
    updateBuckets();
    source.setData(geojson);
    renderLayer();
}

// --- Search scenario ---
/**
 * Collects every `region` and `district` value into {@link placeIndex} together
 * with the bounding box of its geometry, so the search field can offer
 * autocomplete suggestions and fly to the chosen place. Regions are preferred
 * over districts when a name repeats.
 */
function buildPlaceIndex(data) {
    placeIndex.clear();
    data.features.forEach((feature) => {
        const { region, district } = feature.properties;
        if (region) {
            addPlace(region, 'region', feature);
        }
        if (district) {
            addPlace(district, 'district', feature);
        }
    });
}

/** Adds a feature's geometry to the bounds of the named place. */
function addPlace(name, type, feature) {
    let entry = placeIndex.get(name);
    if (!entry) {
        entry = {
            type,
            bounds: { southWest: [Infinity, Infinity], northEast: [-Infinity, -Infinity] },
        };
        placeIndex.set(name, entry);
    }
    extendBounds(entry.bounds, feature.geometry.coordinates);
}

/**
 * Grows a bounding box with every coordinate found in a GeoJSON coordinates
 * tree. Longitudes are normalised into the 0..360 range so places that cross
 * the antimeridian (e.g. Chukotka) do not span the whole globe.
 */
function extendBounds(bounds, coordinates) {
    visitCoords(coordinates, (coord) => {
        const lng = coord[0] < 0 ? coord[0] + 360 : coord[0];
        const lat = coord[1];
        if (lng < bounds.southWest[0]) bounds.southWest[0] = lng;
        if (lat < bounds.southWest[1]) bounds.southWest[1] = lat;
        if (lng > bounds.northEast[0]) bounds.northEast[0] = lng;
        if (lat > bounds.northEast[1]) bounds.northEast[1] = lat;
    });
}

/** Suggestion type label shown on the right of each option. */
const PLACE_TYPE_LABEL = {
    region: 'регион',
    district: 'район',
};

let suggestionItems = [];
let suggestionActive = -1;

/** Rebuilds the suggestion list for the current query. */
function updateSuggestions() {
    const query = mapSearchInput.value.trim().toLowerCase();
    mapSearchSuggestions.innerHTML = '';
    suggestionItems = [];
    suggestionActive = -1;

    if (!query) {
        mapSearchSuggestions.classList.add('hidden');
        return;
    }

    const matches = [];
    placeIndex.forEach((entry, name) => {
        if (name.toLowerCase().includes(query)) {
            matches.push({ name, type: entry.type });
        }
    });
    // Prefer names that start with the query, then sort alphabetically.
    matches.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(query) ? 0 : 1;
        return aStarts - bStarts || a.name.localeCompare(b.name, 'ru');
    });

    if (!matches.length) {
        mapSearchSuggestions.classList.add('hidden');
        return;
    }

    matches.slice(0, 8).forEach((match) => {
        const item = document.createElement('div');
        item.className = 'map-search-suggestion';
        const name = document.createElement('span');
        name.className = 'suggestion-name';
        name.textContent = match.name;
        const type = document.createElement('span');
        type.className = 'suggestion-type';
        type.textContent = PLACE_TYPE_LABEL[match.type] || '';
        item.append(name, type);
        item.addEventListener('mousedown', (ev) => {
            // `mousedown` (not `click`) so the input keeps focus.
            ev.preventDefault();
            mapSearchInput.value = match.name;
            hideSuggestions();
        });
        mapSearchSuggestions.appendChild(item);
        suggestionItems.push(item);
    });

    mapSearchSuggestions.classList.remove('hidden');
}

function hideSuggestions() {
    mapSearchSuggestions.classList.add('hidden');
    suggestionItems = [];
    suggestionActive = -1;
}

/** Highlights the suggestion at the given index (keyboard navigation). */
function setActiveSuggestion(index) {
    if (!suggestionItems.length) {
        return;
    }
    suggestionActive = (index + suggestionItems.length) % suggestionItems.length;
    suggestionItems.forEach((item, i) => {
        item.classList.toggle('active', i === suggestionActive);
        if (i === suggestionActive) {
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

/**
 * Commits the search value to the map style state. The `selectGeo` key is read
 * by the search layer's color expression to highlight matching polygons.
 * If the value matches a known place, the map flies to its bounding box.
 */
function applySearch() {
    const value = mapSearchInput.value.trim();
    hideSuggestions();
    map.patchStyleState({ selectGeo: value });

    const entry = placeIndex.get(value);
    if (entry) {
        map.fitBounds(entry.bounds, { padding: getFitPadding() });
    }
}

/** Clears the search value and resets the selection style state. */
function clearSearch() {
    mapSearchInput.value = '';
    hideSuggestions();
    map.patchStyleState({ selectGeo: '', selectedRegions: [] });
}

// --- Selection scenario ---
/**
 * Toggles the clicked feature's place name in the map-wide `selectedRegions`
 * style-state array. Regions take precedence over districts when both exist.
 * The selection layer's color expression reads this array to highlight
 * matching polygons.
 */
map.on('click', (ev) => {
    if (activeCase !== 'selection') {
        return;
    }
    if (!ev.targetData || !ev.targetData.feature) {
        return;
    }
    const { region, district } = ev.targetData.feature.properties;
    const value = region || district;
    if (!value) {
        return;
    }
    const current = map.getStyleState().selectedRegions || [];
    const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
    map.patchStyleState({ selectedRegions: next });
    renderSelectionList();
});

/**
 * Rebuilds the list of selected places shown in the sidebar panel. Each item
 * has a “×” button that removes its value from `selectedRegions`; clicking the
 * place name flies the map to its bounding box via `fitBounds`.
 */
function renderSelectionList() {
    const selected = map.getStyleState().selectedRegions || [];
    selectionList.innerHTML = '';
    selectionEmpty.classList.toggle('hidden', selected.length > 0);

    selected.forEach((name) => {
        const item = document.createElement('li');
        item.className = 'selection-item';

        const label = document.createElement('span');
        label.className = 'selection-item-name city-item';
        label.textContent = name;
        label.title = `Перейти к «${name}»`;
        label.addEventListener('click', () => {
            const entry = placeIndex.get(name);
            if (entry) {
                map.fitBounds(entry.bounds, { padding: getFitPadding() });
            }
        });

        const remove = document.createElement('button');
        remove.className = 'selection-item-remove';
        remove.title = 'Убрать из выделения';
        remove.textContent = '×';
        remove.addEventListener('click', () => {
            const current = map.getStyleState().selectedRegions || [];
            map.patchStyleState({
                selectedRegions: current.filter((value) => value !== name),
            });
            renderSelectionList();
        });

        item.append(label, remove);
        selectionList.appendChild(item);
    });
}

/** Cities offered in the “blocks” scenario's navigation panel. */
const BLOCKS_CITIES = [
    { label: 'Москва', place: 'Москва' },
    { label: 'Санкт-Петербург', place: 'Санкт-Петербург' },
    { label: 'Казань', place: 'городской округ Казань' },
    { label: 'Севастополь', place: 'Севастополь' },
];

/**
 * Rebuilds the “blocks” scenario's cities panel. Unlike the selection panel,
 * items cannot be removed — clicking one simply flies the map to that city's
 * bounding box via `fitBounds`.
 */
function renderCitiesList() {
    citiesList.innerHTML = '';

    BLOCKS_CITIES.forEach(({ label, place }) => {
        const item = document.createElement('li');
        item.className = 'selection-item city-item';

        const name = document.createElement('span');
        name.className = 'selection-item-name';
        name.textContent = label;
        name.title = label;

        item.appendChild(name);
        item.addEventListener('click', () => {
            const entry = placeIndex.get(place);
            if (entry) {
                map.fitBounds(entry.bounds, { padding: getFitPadding() });
            }
        });

        citiesList.appendChild(item);
    });
}

mapSearchInput.addEventListener('input', updateSuggestions);
mapSearchInput.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        setActiveSuggestion(suggestionActive + 1);
    } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        setActiveSuggestion(suggestionActive - 1);
    } else if (ev.key === 'Enter') {
        ev.preventDefault();
        if (suggestionActive >= 0) {
            mapSearchInput.value = suggestionItems[suggestionActive].querySelector(
                '.suggestion-name',
            ).textContent;
        }
        applySearch();
        mapSearchInput.blur();
    } else if (ev.key === 'Escape') {
        hideSuggestions();
    }
});
mapSearchInput.addEventListener('blur', () => {
    // Delay so a suggestion's `mousedown` handler runs first.
    setTimeout(hideSuggestions, 120);
});
mapSearchClear.addEventListener('click', () => {
    clearSearch();
    mapSearchInput.focus();
});

/**
 * Centers and zooms the map to fit all rendered features (ADM1 regions).
 * See https://docs.2gis.com/mapgl/map/configuration/fitbounds
 */
function fitToData() {
    if (!geojson) {
        return;
    }
    let minLng = Infinity;
    let minLat = Infinity;
    let maxLng = -Infinity;
    let maxLat = -Infinity;

    geojson.features.forEach((feature) => {
        if (feature.properties.adm !== 'ADM1') {
            return;
        }
        visitCoords(feature.geometry.coordinates, (coord) => {
            // Russia crosses the antimeridian: Chukotka's easternmost parts are
            // stored with negative longitudes. Shift them into the 0..360 range
            // so min/max no longer span the whole globe.
            const lng = coord[0] < 0 ? coord[0] + 360 : coord[0];
            const lat = coord[1];
            if (lng < minLng) minLng = lng;
            if (lat < minLat) minLat = lat;
            if (lng > maxLng) maxLng = lng;
            if (lat > maxLat) maxLat = lat;
        });
    });

    if (minLng === Infinity) {
        return;
    }

    const padding = getFitPadding();
    map.fitBounds(
        {
            southWest: [minLng, minLat],
            northEast: [maxLng, maxLat],
        },
        { padding },
    );
}

/** Padding that keeps the fitted bounds clear of the sidebar. */
function getFitPadding() {
    const gutter = 40;
    const sidebarWidth = sidebar.classList.contains('collapsed')
        ? 0
        : sidebar.getBoundingClientRect().width;
    return {
        top: gutter,
        right: gutter,
        bottom: gutter,
        left: gutter + sidebarWidth,
    };
}

/** Recursively visits every [lng, lat] pair in a GeoJSON coordinates tree. */
function visitCoords(coords, callback) {
    if (typeof coords[0] === 'number') {
        callback(coords);
        return;
    }
    coords.forEach((child) => visitCoords(child, callback));
}

/**
 * (Re)adds the scenario layers.
 *
 * The “population” scenario draws a single ADM1 layer colored by value.
 * The “detail” scenario uses two layers with dedicated zoom ranges (via the
 * `minzoom`/`maxzoom` layer fields) so ADM1 is shown when zoomed out and ADM2
 * takes over when zoomed in — no zoom event handling in JS is needed.
 * The “search” scenario draws no data layer yet — its logic is defined later.
 */
function renderLayer() {
    if (!styleLoaded || !geojson) {
        return;
    }
    if (addedLayers.length) {
        addedLayers.forEach((id) => map.removeLayer(id));
        addedLayers = [];
    }

    if (activeCase === 'search') {
        map.addLayer({
            id: 'search-polygons',
            type: 'polygon',
            // All administrative levels are shown at once, without strokes.
            filter: buildFilter(['ADM1', 'ADM2', 'ADM3']),
            style: {
                color: buildSearchColorExpression(),
                strokeWidth: 0,
            },
        });
        addedLayers = ['search-polygons'];
        return;
    }

    if (activeCase === 'blocks') {
        const alpha = Math.round(settings.opacity * 255)
            .toString(16)
            .padStart(2, '0');
        // Only intra-city blocks (ADM3) are shown; everything else stays hidden.
        // The fill is zoom-dependent: the “out” color (opaque) when zoomed way
        // out, interpolating to the translucent “in” color when zoomed in.
        // The stroke is zoom-independent, so block borders stay visible.
        map.addLayer({
            id: 'blocks-adm3',
            type: 'polygon',
            filter: buildFilter('ADM3'),
            style: {
                color: [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    BLOCKS_ZOOM_OUT,
                    `${settings.blocksFillOut}ff`,
                    BLOCKS_ZOOM_IN,
                    `${settings.blocksFillIn}${alpha}`,
                ],
                strokeColor: settings.blocksStrokeColor,
                strokeWidth: 1,
            },
        });
        addedLayers = ['blocks-adm3'];
        return;
    }

    if (activeCase === 'selection') {
        const alpha = Math.round(settings.opacity * 255)
            .toString(16)
            .padStart(2, '0');
        const grey = `${SEARCH_DEFAULT_COLOR}${alpha}`;
        const highlight = `${settings.selectionColor}${alpha}`;

        // Base layers follow the same zoom ranges as the “detail” scenario:
        // ADM1 when zoomed out, ADM2/ADM3 when zoomed in.
        map.addLayer({
            id: 'selection-adm1',
            type: 'polygon',
            filter: buildFilter('ADM1'),
            maxzoom: DETAIL_ZOOM,
            style: { color: grey, strokeWidth: 0 },
        });
        map.addLayer({
            id: 'selection-adm2',
            type: 'polygon',
            filter: buildFilter(['ADM2', 'ADM3']),
            minzoom: DETAIL_ZOOM,
            style: { color: grey, strokeWidth: 0 },
        });
        // Selected features are drawn on top at *any* zoom, so a chosen region
        // stays visible even when zoomed in (and a chosen district — zoomed out).
        map.addLayer({
            id: 'selection-highlight',
            type: 'polygon',
            filter: buildSelectionFilter(),
            style: { color: highlight, strokeWidth: 0 },
        });
        addedLayers = ['selection-adm1', 'selection-adm2', 'selection-highlight'];
        return;
    }

    if (activeCase === 'detail') {
        const alpha = Math.round(settings.opacity * 255)
            .toString(16)
            .padStart(2, '0');
        const withAlpha = (hex) => `${hex}${alpha}`;

        map.addLayer({
            id: 'detail-adm1',
            type: 'polygon',
            filter: buildFilter('ADM1'),
            maxzoom: DETAIL_ZOOM,
            style: { color: withAlpha(settings.regionColor), strokeWidth: settings.strokeWidth },
        });
        map.addLayer({
            id: 'detail-adm2',
            type: 'polygon',
            filter: buildFilter(['ADM2', 'ADM3']),
            minzoom: DETAIL_ZOOM,
            style: { color: withAlpha(settings.districtColor), strokeWidth: settings.strokeWidth },
        });
        addedLayers = ['detail-adm1', 'detail-adm2'];
        return;
    }

    map.addLayer({
        id: LAYER_ID,
        type: 'polygon',
        filter: buildFilter('ADM1'),
        style: { color: buildColorExpression() },
    });
    addedLayers = [LAYER_ID];
}

/**
 * Filter that keeps only features of the given administrative level(s).
 * Accepts a single level or an array of levels.
 */
function buildFilter(adm) {
    const levels = Array.isArray(adm) ? adm : [adm];
    return [
        'all',
        ['match', ['sourceAttr', 'purpose'], [SOURCE_NAME], true, false],
        ['match', ['get', 'adm'], levels, true, false],
    ];
}

/** Grey fill used by the search scenario until a place is selected. */
const SEARCH_DEFAULT_COLOR = '#bdbdbd';

/** Zoom range over which the “blocks” scenario interpolates its fill color. */
const BLOCKS_ZOOM_OUT = 2;
const BLOCKS_ZOOM_IN = 12;

/**
 * Color expression for the search scenario.
 *
 * Reads the map-wide style state key `selectGeo` (set via
 * `map.patchStyleState`) and fills in the “found” color every polygon whose
 * `region` or `district` equals the searched value. Everything else stays grey.
 */
function buildSearchColorExpression() {
    const alpha = Math.round(settings.opacity * 255)
        .toString(16)
        .padStart(2, '0');
    // `['global', …]` returns `null` when the key is unset, and `null === null`
    // would otherwise highlight features without a name — so guard against it.
    const matchField = (field) => [
        'all',
        ['!=', ['global', 'selectGeo'], null],
        ['!=', ['global', 'selectGeo'], ''],
        ['==', ['global', 'selectGeo'], ['get', field]],
    ];

    const found = `${settings.searchColor}${alpha}`;

    return [
        'when',
        matchField('region'),
        found,
        matchField('district'),
        found,
        `${SEARCH_DEFAULT_COLOR}${alpha}`,
    ];
}

/**
 * Filter for the selection scenario's highlight layer.
 *
 * Reads the map-wide style state key `selectedRegions` (an array set via
 * `map.patchStyleState`) and keeps only features whose `region` or `district`
 * is contained in that array. The layer has no zoom limits, so the selection is
 * visible at any zoom regardless of which base layer is active.
 */
function buildSelectionFilter() {
    // `['in', needle, haystack]` checks membership in an array.
    return [
        'all',
        ['match', ['sourceAttr', 'purpose'], [SOURCE_NAME], true, false],
        ['match', ['get', 'adm'], ['ADM1', 'ADM2', 'ADM3'], true, false],
        [
            'any',
            ['in', ['get', 'region'], ['global', 'selectedRegions']],
            ['in', ['get', 'district'], ['global', 'selectedRegions']],
        ],
    ];
}

/**
 * Builds a match expression that colors polygons by their `bucket` value.
 * Until a scenario is selected all features are painted a uniform gray.
 */
function buildColorExpression() {
    const alpha = Math.round(settings.opacity * 255)
        .toString(16)
        .padStart(2, '0');

    if (!activeCase) {
        return `#bdbdbd${alpha}`;
    }

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
    const values = geojson.features
        .map((f) => f.properties.population)
        .filter((v) => typeof v === 'number' && !Number.isNaN(v));
    const logMin = Math.log10(Math.min(...values));
    const logMax = Math.log10(Math.max(...values));

    const binFeatures = Array.from({ length: settings.bins }, () => []);

    geojson.features.forEach((feature) => {
        const value = feature.properties.population;
        if (typeof value !== 'number' || Number.isNaN(value)) {
            // No numeric value — leave the default color
            feature.properties.bucket = -1;
            return;
        }
        const t = logMax === logMin ? 0 : (Math.log10(value) - logMin) / (logMax - logMin);
        const bucket = Math.min(settings.bins - 1, Math.floor(t * settings.bins));
        feature.properties.bucket = bucket;
        binFeatures[bucket].push(feature);
    });

    renderLegend(binFeatures);
}

// --- Hover: draw a polygon overlay on top (see geojson-hover-polygon example) ---
const tooltip = document.getElementById('map-tooltip');

/** Returns the label shown in the tooltip for a feature, or `null`. */
function getFeatureLabel(properties) {
    if (!properties) {
        return null;
    }
    if (properties.adm === 'ADM1') {
        return properties.region || null;
    }
    return properties.district || null;
}

/** Shows the single-line tooltip at the bottom of the map. */
function showTooltip(text) {
    tooltip.textContent = text;
    tooltip.classList.remove('hidden');
}

function hideTooltip() {
    tooltip.classList.add('hidden');
}

map.on('mouseover', (ev) => {
    if (!settings.hover) {
        return;
    }
    clearHover();
    if (!ev.targetData || !ev.targetData.feature) {
        return;
    }
    const label = getFeatureLabel(ev.targetData.feature.properties);
    if (label && settings.tooltip) {
        showTooltip(label);
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
    hideTooltip();
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
