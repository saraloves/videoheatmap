var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('./db_config.js');

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

console.log('serving static files from: ', __dirname);


app.use('/', express.static('public/', __dirname));

app.use(express.bodyParser());

app.listen(3000);
console.log('Listening on port 3000');