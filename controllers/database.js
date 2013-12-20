var Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('../db_config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  logging: config.logging,
  maxConcurrentQueries: config.maxConcurrentQueries,
  dialect: config.dialect,
  native: config.native
});

var voteTable = sequelize.define('votes', {
  video_id: Sequelize.STRING,
  timestamp: Sequelize.DATE,
  vote: Sequelize.INTEGER
});

var sendResponse = function(res, query){
  voteTable.findAll(query, { raw: true }).success(function(votes){
    res.send(votes);
  });
};
var newVote = function(json){
  var voteCreate = {
    video_id: json.videoID,
    timestamp: Math.floor(json.second),
    vote: vote
  };
  voteTable.create(voteCreate).success(function() {
    sendResponse(res, {});
  });
};

voteTable.sync();

module.exports.createVote = function(req, res){
  var json = '';
  req.on('data', function(chunk){
    json += chunk;
  });
  req.on('end', function(){
    newVote(json);
  });
};

module.exports.getVotes = function(req, res){
  var query = {where: {'video_id': req.params.id}, attributes: ['timestamp', 'vote']};
  sendResponse(res, query);
};