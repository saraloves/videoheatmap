App.Views.VideoPlayer = Backbone.View.extend({

  template: _.template( $('#videoTemplate').html() ),

  className: 'video',

  initialize: function () {
    this.render();
    var self = this;
    this.$('video').on('loadedmetadata', function(){
      self.createHeatmap(self.model.get('width'), self.model.attributes.videoPlayer.duration(), self.model.id);
    });
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  },

  events: {
    'click .vjs-heat-button': 'toggleHeatmap',
    'click .vjs-upvote-button': 'createVote',
    'click .vjs-downvote-button': 'createVote',
    'keydown': 'keyCreateVote'
  },

  keyCreateVote: function(e) {
    console.log("I'm being invoked");
    var id = this.model.id;
    var timeStamp = this.model.attributes.videoPlayer.currentTime();
    var vote;
    if (e.keyCode === 38) vote = 1;
    else if (e.keyCode === 40) vote = -1;
    if (vote) {
      this.model.attributes.votes.create({
        video_id: id,
        timestamp: timeStamp,
        vote: vote
      });
      this.createHeatmap(this.model.get('width'), this.model.attributes.videoPlayer.duration(), this.model.id);
      e.preventDefault();
    }
  },

  createVote: function(e) {
    var id = this.model.id;
    var timeStamp = this.model.attributes.videoPlayer.currentTime();
    var type = $(e.target).find('.vjs-control-content').context.className;
    var vote = type === 'vjs-upvote-button vjs-control' ? 1 : -1;

    this.model.attributes.votes.create({
      video_id: id,
      timestamp: timeStamp,
      vote: vote
    });
    this.createHeatmap(this.model.get('width'), this.model.attributes.videoPlayer.duration(), this.model.id);
    e.preventDefault();
  },

  createHeatmap: function(width, numSeconds, videoID){
    width = width*2;
    var height = 10;
    var secondWidth = width/numSeconds;

    d3.json('/votes/'+ videoID, function(json) {
      var total = d3.nest()
        .rollup(function(d){
          return d.length;
        })
        .entries(json);

      var data = d3.nest()
        .key(function(d) { return d.timestamp; })
        .sortKeys(d3.ascending)
        .rollup(function(d){
          return [d3.mean(d,function(g) { return +g.vote;}), (d.length/total)];
        })
        .entries(json);

      var colorScale = d3.scale.linear()
          .domain([-1, 0, 1])
          .range(["#0000FF", "#B62084", "#FF0020"]);

      d3.select('.vjs-heatmap').selectAll("svg").remove();
      var response = d3.select(' .vjs-heatmap').append("svg")
          .attr({
            "width": "100%",
            "height": "10px"
          })
          .attr("viewBox", "0 0 " + width/2 + " " + height )
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("pointer-events", "all")
        .call(d3.behavior.zoom().on("zoom", redraw));

      var svg = response
        .append('svg:g');

      //screen resize redraw
      var redraw = function() {
        svg.attr("transform",
          "translate(" + d3.event.translate + ")"
          + " scale(" + d3.event.scale + ", 10)");
      }

      var feMerge = svg.append("svg:filter")
          .attr("id", "glow")
        .append("svg:feGaussianBlur")
          .attr("stdDeviation", 5)
          .attr("result", "coloredBlur")
        .append("feMerge");

      feMerge.append("feMergeNode")
          .attr("in", "coloredBlur");
      feMerge.append("feMergeNode")
          .attr("in", "SourceGraphic");

      var gradient = svg.append("svg:linearGradient")
          .attr("id", "Gradient");
      gradient.append("svg:stop")
          .attr("offset", 0)
          .attr("stop-color", "white")
          .attr("stop-opacity", 0.2);
      gradient.append("svg:stop")
          .attr("offset", 0.5)
          .attr("stop-color", "white")
          .attr("stop-opacity", 1);
      gradient.append("svg:stop")
          .attr("offset", 1)
          .attr("stop-color", "white")
          .attr("stop-opacity", 0.2);

      svg.selectAll(".masks")
        .data(data).enter()
        .append("svg:mask")
          .attr("id", function(d) { return "Mask" + d.key; })
        .append("svg:rect")
          .attr("x", function(d) { return (((+d.key)-1) * secondWidth)/2; })
          .attr("y",0)
          .attr("width",secondWidth*2)
          .attr("height", height)
          .attr("fill", "url(#Gradient)");

      var heatMap = svg.selectAll(".second")
        .data(data)
        .enter().append("rect")
          .attr("x", function(d) { return (((+d.key)-1) * secondWidth)/2; })
          .attr("y", 0)
          .attr("width", secondWidth*2)
          .attr("height", height)
          .attr("mask", function(d) { return "url(#Mask"+ d.key + ")" });

      heatMap.style("fill", function(d) {
        return colorScale(d.values[0]);
      });
      heatMap.style("opacity", function(d){
        return d.values[1]*15;
      })
      heatMap.attr("filter", "url(#glow)");
    });

    //fullscreen redraw trigger
    var self = this;
    $('#' + videoID).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      var event = state ? 'FullscreenOn' : 'FullscreenOff';
      if(event === 'FullscreenOn'){
        self.createHeatmap(screen.width, self.model.attributes.videoPlayer.duration(), self.model.id);
      } else {
        self.createHeatmap(self.model.get('width'), self.model.attributes.videoPlayer.duration(), self.model.id);
      }
    });
  },

  toggleHeatmap: function(e){
    this.$el.find("#" + this.model.id).find('.vjs-heatmap').toggleClass('hidden');
    e.preventDefault();
  }
});