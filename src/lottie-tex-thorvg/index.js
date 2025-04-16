import ThorVG from './thorvg-wasm.js';

const map = (window.map) = new mapgl.Map('map', {
    center: [37.60170, 55.73004],
    zoom: 19,
    pitch: 17,
    rotation: 160,
    key: '4970330e-7f1c-4921-808c-0eb7c4e63001',
});

const _wasmUrl = './thorvg-wasm.wasm'; 
async function initThorvg () {
    const thorvg = await ThorVG({
        locateFile: (path, prefix) => {
          if (path.endsWith('.wasm')) {
            return _wasmUrl;
          }
          return prefix + path;
        }
    });
    
    return thorvg;
}

const canvas = document.querySelector('#test');
const dpr = window.devicePixelRatio;
canvas.width = 100 * dpr + 2;
canvas.height = 100 * dpr + 2;

initThorvg()
    .then(tvg => {
        window.thorvg = tvg;
    })
    .then(() => fetch('./b.json').then(r => r.arrayBuffer()))
    .then(buffer => {
        const lottieAnimation = new window.thorvg.TvgLottieAnimation('gl', `#test`);
        const isLoaded = lottieAnimation.load(new Uint8Array(buffer), 'json', canvas.width, canvas.height, '');
        if (!isLoaded) {
            throw new Error('Unable to load an image. Error: ', lottieAnimation.error());
        }

        const isUpdated = lottieAnimation.update();
        if (isUpdated) {
            lottieAnimation.render();
        }

        window.lottieAnimation = lottieAnimation;
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

const now =() => performance.now() / 1000;


let tex;
const start = now();
let duration = 0;
let totalFrames = 0;

function renderAndCopyToTexture() {
    if (!tex) {
        tex = map._impl.modules.imageManager.texturesMap.get("./raster.jpg");
    }
    const lottieAnimation = window.lottieAnimation;
    if (!tex || !lottieAnimation) {
        requestAnimationFrame(renderAndCopyToTexture);
        return;
    }

    if (!totalFrames) {
        totalFrames = lottieAnimation.totalFrame();
    }

    if (!duration) {
        duration = lottieAnimation.duration();
    }

    const frame = (((now() - start) % duration) / duration) * totalFrames;

    lottieAnimation.frame(frame);
    const isUpdated = lottieAnimation.update();
    if (isUpdated) {
        lottieAnimation.render();
    }

    tex.subImage(map.getWebGLContext(), canvas, 0, 0); 
    map.triggerRerender();        

    requestAnimationFrame(renderAndCopyToTexture);
};
renderAndCopyToTexture();