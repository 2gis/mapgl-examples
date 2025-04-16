const map = new mapgl.Map('map', {
    center: [37.60170, 55.73004],
    zoom: 19,
    pitch: 17,
    rotation: 160,
    key: '4970330e-7f1c-4921-808c-0eb7c4e63001',
});

const raster = new mapgl.Raster(map, {
    bounds: {
        northEast: [37.6020409731679, 55.7300642168048],
        southWest: [37.60157395741118, 55.72982724674528],
    },
    image: {
        url: './raster.jpg',
    },
    opacity: 0.8,
});

const canvas = document.querySelector('#test');
const dpr = window.devicePixelRatio;
canvas.width = 100 * dpr + 2;
canvas.height = 100 * dpr + 2;

bodymovin.loadAnimation({
    loop: true,
    autoplay: true,
    path: './b.json',
    renderer: 'canvas',
    rendererSettings: {
        context: canvas.getContext('2d'),
        scaleMode: 'noScale',
    }
});

let tex;

function renderAndCopyToTexture() {
    if (!tex) {
        tex = map._impl.modules.imageManager.texturesMap.get("./raster.jpg");
    }
    if (!tex || !canvas) {
        requestAnimationFrame(renderAndCopyToTexture);
        return;
    }

    tex.subImage(map.getWebGLContext(), canvas, 0, 0); 
    map.triggerRerender();        

    requestAnimationFrame(renderAndCopyToTexture);
};
renderAndCopyToTexture();