var createHeatmap = function(width, numSeconds, videoID){
  width = width || 600; // Youtube Player width
  var height = 25;
  numSeconds = numSeconds || 248; //Youtube video length in seconds
  var secondWidth = width/numSeconds;
  videoID = videoID || '1';  //Youtube video id requested

  d3.json('/votes/'+ videoID, //get request address from the server
    function(json) {
      return d3.nest()
        .key(function(d) { return d.timestamp; })
        .sortKeys(d3.ascending)
        .rollup(function(d){ 
          return {vote: d3.mean(d, function(g){ 
            return +g.vote;
          })};
        })
        .entries(json);
    },
    function(error, data) {
      var colorScale = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["red", "grey", "green"]);

      var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

      var heatMap = svg.selectAll(".second")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return (d.second-1) * secondWidth; })
        .attr("width", secondWidth)
        .attr("height", height);

      heatMap.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value); });
  });
};