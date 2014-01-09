var createVideoLengthVotesChart = function (voteData) {
  var data = lengthVotes(voteData);
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
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
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .axisLabel('Quantity of votes')
        .tickFormat(d3.format(',.1d'));

    d3.select('#chart2 svg')
        .datum(data)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}