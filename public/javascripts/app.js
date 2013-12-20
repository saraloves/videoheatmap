var videos = new App.Collections.VideoPlayersList([
  { id: '1QBgK0_RbkE' },
  { id: '2QBgK0_RbkE' },
  { id: '7QBgK0_RbkE' }
]);

var playerView = new App.Views.VideoPlayer({
  collection: videos
});

playerView.$el.appendTo('body');