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

var Video = sequelize.define('video', {
  video_title: Sequelize.STRING,
  user_id: Sequelize.STRING,
  url: Sequelize.STRING
});

Video.sync();

var sendResponse = function(res, query){
  Video.findAll(query).success(function(video){
    res.send(video);
  });
};

var newVideo = function(json, res){
  Video.findOrCreate(json).success(function() {
    res.redirect('/admin');
  });
};

var createVideo = function(req, res){
  if(req.user){
    var videoCreate = {
      video_title: req.body.video_title,
      user_id: req.user.username,
      url: req.body.url
    };
    newVideo(videoCreate, res);
  }
};

var getVideo = function(req, res){
  if (req.params.vidID) {
    var query = {where: {'id': req.params.vidID}};
  } else {
    var query = {where: {'user_id': req.user.username}};
  }
  sendResponse(res, query);
};

module.exports.createVideo = createVideo;
module.exports.getVideo = getVideo;