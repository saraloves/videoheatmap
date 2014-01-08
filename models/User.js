var Sequelize = require('sequelize');
var pg = require('pg').native;
var PassportLocalStrategy = require('passport-local').Strategy;
var config = require('../db_config');
var bcrypt = require('bcrypt');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  logging: config.logging,
  pool: { maxConnections: 10, maxIdleTime: 30},
  dialect: config.dialect,
  native: config.native
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.sync();

var register = function(req, res){
  User.sync();

  User.find({where: {username: req.body.username}}).success(function(user){
    if (!user){
      var password = bcrypt.hashSync(req.body.password, 10);
      User.create({username: req.body.username, password: password}).success(function(user){
        req.login(user, function(err){
          if (err) { return next(err) };
          return res.redirect("/");
        });
      });
    } else {
      res.json({
        success:false,
        message: 'Username already exists'
      });
    }
  });
};

var authTable = {};
authTable.localStrategy = new PassportLocalStrategy({
    username: 'username',
    password: 'password'
  },

  function (username, password, done){
    var User = require('./User').User;

    User.find({where: {username: username}}).success(function(user){
      if (!user){
        return done(null, false, { message: 'User not found.'} );
      }
      if (!bcrypt.compareSync(password, user.password)){
        return done(null, false, { message:'Incorrect password.'} );
      }
      return done(null, { username: user.username });
    });
  }
);

authTable.validPassword = function(password){
  return this.password == password;
}

authTable.serializeUser = function(user, done){
  done(null, user);
};

authTable.deserializeUser = function(obj, done){
  done(null, obj);
};

module.exports.authTable = authTable;
module.exports.User = User;
module.exports.register = register;