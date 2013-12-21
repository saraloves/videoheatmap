App.Views.VideoPlayer = Backbone.View.extend({
  tagName: 'section',
  className: 'videos-wrapper',

  initialize: function () {
    this.collection.on('add', this.appendVideoTag, this);
    this.render();
  },

  template: _.template( $('#videoTemplate').html() ),

  render: function () {
    this.collection.each(this.appendVideoTag, this);
  },

  appendVideoTag: function (videoPlayer) {
    this.$el.append(this.template( videoPlayer.toJSON() ));
    this.$el.appendTo('body');
    videoPlayer.getVideo();
  }
});