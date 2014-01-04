var Sequelize = require('sequelize'),
  PassportLocalStrategy = require('passport-local').Strategy;
var pg = require('pg').native;
var config = require('../db_config');
var passport = require('passport');
var User = require('../models/User');

var AuthController = {

    // Login a user 
  login: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login/failure'
  }),

  register: function(req, res){
    var User = require('../models/User').User;
    User.sync();
    User.find({where :{username: req.body.username}}, {raw: true}).success(function(user){
      if (!user){
        User.create({username: req.body.username, password: req.body.password}).success(function(user){
          req.login(user, function(err){
            if (err) { return next(err) };
            return res.redirect("/");
          });
        });
      }
      else {
        res.json({
            success:false, 
            message: 'Username already exists'
        });
      }
    });
  },

  // on Login Success callback
  loginSuccess: function(req, res){
    res.json({
      success: true,
      user: req.session.passport.user
    });
  },

  // on Login Failure callback
  loginFailure: function(req, res){
    res.json({
      success:false, 
      message: 'Invalid username or password.'
    });
  },

  // Log out a user   
  logout: function(req, res){
    req.logout();
    res.end();
  }
};

exports = module.exports = AuthController;