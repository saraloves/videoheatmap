App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
    this.set('width', 780);
  },

  getVideo: function () {
    this.createPlugins('upVote', 'downVote', 'showHeat');
    this.createVideo.call(this);

    //hack for Youtube API
    window.onYouTubePlayerReady = function(id) {
      var events = window.YTEvents;
      for(var i = 0; i < events.length; i++){
        if(events[i][id]){
          events[i][id]();
        }
      }
    }
  },

  createPlugins: function(){
    var args = Array.prototype.slice.call(arguments);

    var createPlugin = function (pluginName, pluginType) {
      var options = { 'el' : this.createButton(pluginType) };
      var constructorName = 'Create' + pluginType;
      videojs[constructorName] = this.createButtonConstructor();
      videojs.plugin(pluginName, function(){
        var button = new videojs[constructorName](this, options);
        this.controlBar.el().appendChild(button.el());
      });
    };

    for (var i = 0; i < args.length; i++) {
      var pluginName = args[i] + 'Button';
      createPlugin.call(this, pluginName, args[i]);
    }
  },

  createVideo: function(){
    var videoPlayer = videojs(this.id, {
      plugins : { 
        showHeatButton : {},
        upVoteButton : {},
        downVoteButton: {}
      }
    });
    this.set('videoPlayer', videoPlayer);
  },

  createButtonConstructor: function(player, options){
    return videojs.Button.extend({
      init: function(player, options){
        videojs.Button.call(this, player, options);
      }
    });
  },

  createButton: function(buttonType) {
    var buttonProperties = {
      upVote: {class: 'upvote-button', text: 'Upvote Button'},
      downVote: {class: 'downvote-button', text: 'Downvote Button'},
      showHeat: {class: 'heat-button', text: 'Show Heat'}
    }
    var props = {
      className: 'vjs-' + buttonProperties[buttonType].class + ' vjs-control',
      innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + buttonProperties[buttonType].text + '</span></div>',
      role: 'button',
      'aria-live': 'polite' 
    };
    return videojs.Component.prototype.createEl(null, props);
  }

});