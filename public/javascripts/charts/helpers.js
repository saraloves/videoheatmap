var daysVotes = function (voteData) {
  var getVotes = function (type, month, day, chart) {
    var votes;
    if (chart === 'bar') {
      votes = (type === 'negative') ? (month[day][type] * -1) : month[day][type];
    } else {
      votes = month[day][type];
    }

    return votes;
  };

  var getData = function (type, month, chart) {
    var data = [];
    var votes;

    for (var day in month) {
      votes = getVotes(type, month, day, chart);
      data.push({
        x: parseInt(day),
        y: votes
      });
    }

    return data;
  };

  var januaryDays = voteData.january.days;

  return [
    {
      key: 'All Votes',
      values: getData('all', januaryDays, 'linear'),
      color: '#ff7f0e'
    },
    {
      key: 'Positive Votes',
      values: getData('positive', januaryDays, 'linear'),
      color: '#0CBE0A'
    },
    {
      key: 'Negative Votes',
      values: getData('negative', januaryDays, 'linear'),
      color: '#D62728'
    }
  ];
};

var lengthVotes = function (voteData) {
  var getData = function (type) {
    var data = [];
    for (vote in voteData) {
      data.push({
        x: voteData[vote].timestamp,
        y: (type === 'negative') ? voteData[vote][type] * -1 : voteData[vote][type]
      });
    }

    return data;
  };

  return [
    {
      key: 'Positive Votes',
      values: getData('positive'),
      color: '#0CBE0A'
    },
    {
      key: 'Negative Votes',
      values: getData('negative'),
      color: '#D62728'
    }
  ];
};