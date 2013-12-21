App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
  },

  getVideo: function () {
    var url = 'http://www.youtube.com/v/' + this.id + '?enablejsapi=1&playerapiid=' + this.id + '&version=3';

    var attr = {
      data: url,
      width: '780',
      height: '400'
    };

    var params = {
      allowScriptAccess: 'always'
    };

    this.player = swfobject.createSWF(attr, params, this.id);
  }
});