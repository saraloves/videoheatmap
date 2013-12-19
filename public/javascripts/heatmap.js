var width = 600; // Youtube Player width
var height = 25;
var numSeconds = 248; //Youtube video length in seconds
var secondWidth = width/numSeconds;

d3.json('/api/votes', //get request address from the server?
  function(d) {
    return {
      second: +d.timestamp,
      value: +d.vote
    };
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