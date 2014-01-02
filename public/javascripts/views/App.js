App.Views.App = Backbone.View.extend({
  tagName: 'section',
  className: 'videos-wrapper',

  initialize: function () {
    this.collection.on('add', this.appendVideoTag, this);
    this.render();
  },

  render: function () {
    this.collection.each(this.appendVideoTag, this);
  },

  appendVideoTag: function (videoPlayer) {
    var playerView = new App.Views.VideoPlayer({
      model: videoPlayer
    });

    playerView.$el.appendTo('.video-wrapper');
    videoPlayer.getVideo();
  }
});