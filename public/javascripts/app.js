var videos = new App.Collections.VideoPlayersList([
  { id: 'T-D1KVIuvjA' },
  { id: 'cP6VqB4klpQ' },
  { id: '7QBgK0_RbkE' }
]);

var playerView = new App.Views.VideoPlayer({
  collection: videos
});

playerView.$el.appendTo('body');