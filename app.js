
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('./db_config.js');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

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

voteTable.sync().success(function(){
  console.log("I'm working wjklhatajsjasl");
}).error(function(error){
  console.log(error);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});