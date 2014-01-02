App.Models.VideoPlayer = Backbone.Model.extend({
  initialize: function () {
    this.set('votes', new App.Collections.VoteList);
    this.set('width', 640);
  },

  getVideo: function () {
    this.createPlugins('upVote', 'downVote', 'showHeat', 'heatMap');
    this.createVideo.call(this);
  },

  insertButton: function (constructorName, options, pluginType) {
    var button = new videojs[constructorName](this, options);
    if (pluginType === 'heatMap') {
      this.controlBar.el().insertBefore(button.el(), this.controlBar.el().childNodes[0]);
    } else {
      this.controlBar.el().appendChild(button.el());
    }
  },

  createEachPlugin: function (pluginName, pluginType) {
    var constructorName = 'Create' + pluginType;
    var options = {
      'el': this.createButton(pluginType)
    };

    videojs[constructorName] = this.createButtonConstructor();
    var self = this;
    videojs.plugin(pluginName, function () {
      self.insertButton.call(this, constructorName, options, pluginType);
    });
  },

  createPlugins: function(){
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
      var pluginName = args[i] + 'Button';
      this.createEachPlugin.call(this, pluginName, args[i]);
    }
  },

  createVideo: function(){
    var videoPlayer = videojs(this.id, {
      plugins : {
        showHeatButton : {},
        upVoteButton : {},
        downVoteButton: {},
        heatMapButton: {}
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
      upVote: { class: 'upvote-button', text: 'Upvote Button' },
      downVote: { class: 'downvote-button', text: 'Downvote Button' },
      showHeat: { class: 'heat-button', text: 'Show Heat' },
      heatMap: { class: 'heatmap', text: 'Heat' }
    };

    var props = {
      className: 'vjs-' + buttonProperties[buttonType].class + ' vjs-control',
      innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + buttonProperties[buttonType].text + '</span></div>',
      role: 'button',
      'aria-live': 'polite'
    };

    if (buttonType === "heatMap") {
      props.className = 'vjs-' + buttonProperties[buttonType].class + ' vjs-control hidden';
    }

    return videojs.Component.prototype.createEl(null, props);
  }
});