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
        showLegend: true
      });

    chart.xAxis
      .axisLabel('Time (s)')
    chart.yAxis
      .axisLabel('Quantity of votes')
      .tickFormat(d3.format(',.1d'));

    d3.select('#chart2 svg')
      .datum(data)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);
    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
    return chart;
  });
}