var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var monthVotes = {};
var videoLengthVotes = {};

d3.json('javascripts/charts/votes.json', function (error, data) {
  for (var i = 0; i < data.length; i++) {
    parseDataByDays(data[i]);
    parseDataByVideoLength(data[i]);
  }

  createLineDaysVotesChart(monthVotes);
  createVideoLengthVotesChart(videoLengthVotes);
});

var parseDataByVideoLength = function (entry) {
  !!!videoLengthVotes[entry.timestamp] && ( videoLengthVotes[entry.timestamp] = createTimestampVote() );
  var vote = videoLengthVotes[entry.timestamp];

  vote.all += 1;
  entry.vote === 1 ? vote.positive += 1 : vote.negative += 1;
  vote.timestamp = entry.timestamp;
};

var createTimestampVote = function () {
  return {
    all: 0,
    positive: 0,
    negative: 0
  };
};

var parseDataByDays = function (entry) {
  var date = new Date(entry.createdAt);
  var monthName = monthNames[date.getMonth()];
  var monthDay = date.getDate();

  !!!monthVotes[monthName] && ( monthVotes[monthName] = createMonth() );

  var votes = monthVotes[monthName].days[monthDay];

  votes.all += 1;
  entry.vote === 1 ? votes.positive += 1 : votes.negative += 1;
  votes.x = monthDay;
  votes.y = votes.all;
};

var createMonth = function () {
  var month = {
    days: {}
  };

  for (var i = 1; i <= 31; i++ ) {
    month.days[i] = createDay();
  }

  return month;
};

var createDay = function () {
  return {
    all: 0,
    positive: 0,
    negative: 0
  };
};
