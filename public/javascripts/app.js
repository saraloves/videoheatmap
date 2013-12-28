var videos = new App.Collections.VideoPlayersList([
  { url: 'http://video-js.zencoder.com/oceans-clip', id: 'aaaa' },
  { url: 'http://mediaelementjs.com/media/echo-hereweare', id: 'bbbb'}
]);

var appView = new App.Views.App({
  collection: videos
});