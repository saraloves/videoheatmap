App.Views.VideoPlayer = Backbone.View.extend({

  template: _.template( $('#videoTemplate').html() ),

  className: 'video',

  initialize: function () {
    this.render();
    var self = this;
    window.YTEvents = window.YTEvents || []; //hack to play nice with the Youtube API
    var obj = {};
    obj[this.model.id] = function(){
      self.createHeatmap(self.model.get('width'),self.model.player.getDuration(), self.model.id);
    };
    window.YTEvents.push(obj);
  },

  events: {
    'click .btn': 'createVote'
  },

  render: function () {
    this.$el.append(this.template( this.model.toJSON() ));
  },
  createVote: function (e) {
    var id = this.model.id;
    var timeStamp = this.model.player.getCurrentTime();
    var type = $(e.target).data('vote');
    var vote = type === 'dislike' ? -1 : 1;


    this.model.attributes.votes.create({
      video_id: id,
      timestamp: timeStamp,
      vote: vote
    });
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
          return d3.sum(d,function(g) { return +g.vote;})/total;
        })
        .entries(json);

      var colorScale = d3.scale.linear()
          .domain([-1, 0, 1])
          .range(["red", "yellow", "#0cbe0a"]);

      var svg = d3.select("#video-" + videoID).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

      var heatMap = svg.selectAll(".second")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return (d.key-1) * secondWidth; })
        .attr("width", secondWidth+1)
        .attr("height", height);

      heatMap.style("fill", function(d) {
        return colorScale(d.values);
      });
    });
  }
});