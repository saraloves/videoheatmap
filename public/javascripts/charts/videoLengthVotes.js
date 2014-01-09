var createVideoLengthVotesChart = function (voteData) {
  var data = lengthVotes(voteData);
  var chart;
  nv.addGraph(function() {
    chart = nv.models.multiBarChart()
      .options({
        showControls: false,
        stacked: true,
        margin: {
          left: 100,
          bottom: 100,
        },
        showLegend: true,
        tooltipContent: function (key, y, e, graph) {
          return '<h3>' + key + '</h3>' +
                 '<p>' +  e + ' vote(s) on second ' + y + '</p>' ;
        }
      });

    chart.xAxis
      .axisLabel('Time (s)')
    chart.yAxis
      .axisLabel('Quantity of votes')
      .tickFormat(function (d) {
        var formatter = d3.format(',.1d');
        return formatter( (d < 0) ? (d = -d) : d );
      });

    d3.select('#chart2 svg')
      .datum(data)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);
    // chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
    return chart;
  });
}