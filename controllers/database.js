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

voteTable.sync();

var sendResponse = function(res, query){
  voteTable.findAll(query, { raw: true }).success(function(votes){
    res.send(votes);
  });
};

var newVote = function(json, res){
  voteTable.create(voteCreate).success(function() {
    sendResponse(res, {});
  });
};

module.exports.createVote = function(req, res){
  var voteCreate = {
    video_id: req.body.video_id,
    timestamp: Math.floor(req.body.timestamp),
    vote: req.body.vote
  };
  newVote(voteCreate, res);
};

module.exports.getVotes = function(req, res){
  console.log("Get request")
  var query = {where: {'video_id': req.params.id}, attributes: ['timestamp', 'vote']};
  sendResponse(res, query);
};