App.Views.VideoPlayer = Backbone.View.extend({
  template: _.template( $('#videoTemplate').html() ),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  }
});