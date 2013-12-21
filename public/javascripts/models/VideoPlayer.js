App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
  },

  getVideo: function () {
    var url = 'http://www.youtube.com/v/' + this.id + '?enablejsapi=1&playerapiid=' + this.id + '&version=3';

    var params = {
      allowScriptAccess: 'always'
    };

    var attrs = {
      id: this.id
    };

    swfobject.embedSWF(url, this.id, '425', '356', '8', null, null, params, attrs);
  }
});