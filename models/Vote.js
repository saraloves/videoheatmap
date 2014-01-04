var Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('../db_config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  logging: config.logging,
  pool: { maxConnections: 10, maxIdleTime: 30},
  dialect: config.dialect,
  native: config.native
});

var Vote = sequelize.define('vote', {
  user_id: Sequelize.STRING,
  video_id: Sequelize.STRING,
  timestamp: Sequelize.INTEGER,
  vote: Sequelize.INTEGER
});

Vote.sync();

var sendResponse = function(res, query){
  Vote.findAll(query, { raw: true }).success(function(votes){
    res.send(votes);
  });
};

var newVote = function(json, res){
  Vote.findOrCreate(json).success(function() {
    sendResponse(res, {});
  });
};

var createVote = function(req, res){
  if(req.user){
    var voteCreate = {
      user_id: req.user.username,
      video_id: req.body.video_id,
      timestamp: Math.floor(req.body.timestamp),
      vote: req.body.vote
    };
    newVote(voteCreate, res);
  } else {
    console.log("Not logged in");
  }
};

var getVotes = function(req, res){
  var query = {where: {'video_id': req.params.vidID}, attributes: ['timestamp', 'vote']};
  sendResponse(res, query);
};

module.exports.createVote = createVote;
module.exports.getVotes = getVotes;