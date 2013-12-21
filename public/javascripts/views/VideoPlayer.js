App.Views.VideoPlayer = Backbone.View.extend({

  template: _.template( $('#videoTemplate').html() ),

  className: 'video',

  initialize: function () {
    this.render();
  },

  events: {
    'click .btn': 'createVote'
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  },

  createVote: function (e) {
    var id = this.model.id;
    var timeStamp = this.model.player.getCurrentTime();
    var type = $(e.target).data('vote');
    var vote = type === 'dislike' ? -1 : 1;


    this.model.attributes.votes.create({
      video_id: id,
      timestamp: timeStamp,
      vote: vote
    });
  }
});