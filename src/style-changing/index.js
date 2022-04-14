const styles = [
    'c080bb6a-8134-4993-93a1-5b4d8c36a59b',
    'e05ac437-fcc2-4845-ad74-b1de9ce07555',
    'b2b8046f-9bb0-469a-9860-9847032935cc',
    '1db52c6e-66b6-4c99-9c83-5538fa962d43',
    '9e75a94c-36f7-4254-8101-90139ead38ad',
];

let currentStyleIndex = 0;

const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b', // API key can be used on 2gis.github.io/mapgl-examples only!
    style: styles[currentStyleIndex],
});
window.addEventListener('resize', () => map.invalidateSize());

function changeStyle() {
    currentStyleIndex++;
    map.setStyle(styles[currentStyleIndex % styles.length]);
    map.once('idle', () => {
        setTimeout(() => changeStyle(), 1000);
    });
}
map.once('idle', changeStyle);
