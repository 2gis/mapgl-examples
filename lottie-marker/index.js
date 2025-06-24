const map = new mapgl.Map('map', {
    center: [55.31878, 25.23584],
    zoom: 13,
    key: 'a1893935-6834-4445-b97a-3405fb426c5b',
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