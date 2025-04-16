const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: '4970330e-7f1c-4921-808c-0eb7c4e63001',
});

const marker = new mapgl.HtmlMarker(map, {
    coordinates: [55.31878, 25.23584],
    interactive: true,
    html: '<div style="width:102px;height:102px;"></div>'
});

map.on('styleload', () => {
  var animation = bodymovin.loadAnimation({
      container: marker.getContent().firstElementChild,
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      path: './b.json',
  });
})