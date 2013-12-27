var videos = new App.Collections.VideoPlayersList([
  { url: 'http://video-js.zencoder.com/oceans-clip', id: 'aaaa' }
]);

var playerView = new App.Views.VideoPlayer({
  collection: videos
});