App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
    this.set('width', 780);
  },

  getVideo: function () {
    var url = 'http://www.youtube.com/v/' + this.id + '?enablejsapi=1&playerapiid=' + this.id + '&version=3';

    var attr = {
      data: url,
      width: this.get('width'),
      height: '400'
    };

    var params = {
      allowScriptAccess: 'always'
    };

    this.player = swfobject.createSWF(attr, params, this.id);

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