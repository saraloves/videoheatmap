App.Views.VideoPlayer = Backbone.View.extend({

  template: _.template( $('#videoTemplate').html() ),

  className: 'video',

  initialize: function () {
    this.render();

    var self = this;
    window.YTEvents = window.YTEvents || [];
    var obj = {};
    obj[this.id] = function(){
      self.createHeatmap(self.model.get('width'),self.model.player.getDuration(), self.model.id);
    };
    window.YTEvents.push(obj);
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  },

  events: {
    'click .btn': 'createVote',
    'click .vjs-heat-button': 'toggleHeatmap',
    'click .vjs-upvote-button': 'createVote'
  },

  createVote: function(e) {
    console.log(this);
  },

  createHeatmap: function(width, numSeconds, videoID){
    var height = 25;
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
          return (d3.mean(d,function(g) { return +g.vote;}) * ((d.length/total) * 10));
        })
        .entries(json);

      var colorScale = d3.scale.linear()
          .domain([-1, 0, 1])
          .range(["red", "purple", "blue"]);

      var svg = d3.select("#video-" + videoID).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

      var heatMap = svg.selectAll(".second")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return (+d.key-1) * secondWidth; })
        .attr("y", 0)
        .attr("width", secondWidth+1)
        .attr("height", height);

      heatMap.style("fill", function(d) {
        return colorScale(d.values);
      });
    });
  },

  toggleHeatmap: function(e){
    console.log("HI");
    e.preventDefault();

    // this.$el.find("#video-" + this.model.id).toggleClass('hidden');
  }
});