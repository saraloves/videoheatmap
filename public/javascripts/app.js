var videos = new App.Collections.VideoPlayersList([
  { url: 'http://video-js.zencoder.com/oceans-clip', id: 'aaaa' }
]);

var appView = new App.Views.App({
  collection: videos
});