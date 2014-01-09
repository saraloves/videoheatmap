var createLineDaysVotesChart = function (voteData) {
  var data = daysVotes(voteData);
  var chart;
  nv.addGraph(function() {
    chart = nv.models.lineChart()
    .options({
      margin: {
        left: 100,
        bottom: 100
      },
      showLegend: true,
      useInteractiveGuideline: true
    });

    chart.xAxis
      .axisLabel('Days')
    chart.yAxis
      .axisLabel('Quantity of votes')
    d3.select('#chart1 svg')
      .datum(data)
      .call(chart);
    nv.utils.windowResize(chart.update);
    // chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
    return chart;
  });
};