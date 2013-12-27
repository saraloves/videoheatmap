App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
    this.set('width', 780);
  },

  getVideo: function () {
    this.player = document.getElementById(this.id);

    //hack for Youtube API
    window.onYouTubePlayerReady = function(id) {
      var events = window.YTEvents;
      for(var i = 0; i < events.length; i++){
        if(events[i][id]){
          events[i][id]();
        }
      }
    }
  }

});