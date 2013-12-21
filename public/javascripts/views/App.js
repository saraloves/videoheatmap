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

    this.$el.append(playerView.el);
    this.$el.appendTo('body');
    videoPlayer.getVideo();
  }
});