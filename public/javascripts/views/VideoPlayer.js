App.Views.VideoPlayer = Backbone.View.extend({

  template: _.template( $('#videoTemplate').html() ),

  className: 'video',

  initialize: function () {
    this.render();
    var self = this;
    this.$('video').on('loadedmetadata', function(){
      self.createHeatmap.call(self, self.model.get('width'), self.model.attributes.videoPlayer.duration(), self.model.id);
    });
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  },

  events: {
    'click .vjs-heat-button': 'toggleHeatmap',
    'click .vjs-upvote-button': 'createVote',
    'click .vjs-downvote-button': 'createVote'
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
          .range(["#001CFF", "#F100FF", "#FF0020"]);

      d3.select("#" + videoID + ' .vjs-heatmap').selectAll("svg").remove();
      var svg = d3.select("#" + videoID + ' .vjs-heatmap').append("svg")
          .attr("width", width/2)
          .attr("height", height)
        .append("g");

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
          .attr("height",height)
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
        return d.values[1]*10;
      })
      heatMap.attr("filter", "url(#glow)");
    });
  },

  toggleHeatmap: function(e){
    this.$el.find("#" + this.model.id).find('.vjs-heatmap').toggleClass('hidden');
    e.preventDefault();
  }
});