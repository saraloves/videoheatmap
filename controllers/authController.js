var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

var callbacks = function(res, success, message){
  res.json({
    success: success,
    message: message
  });
}

var AuthController = {
    // Login a user
  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login/failure'
  }),
  register: function(req, res){
    User.register(req, res)
  },

  // on Login Success callback
  loginSuccess: function(req, res){
    callbacks(res, true, req.session.passport.user)
  },

  // on Login Failure callback
  loginFailure: function(req, res){
    callbacks(res, false, 'Invalid username or password.')
  },

  // Log out a user
  logout: function(req, res){
    req.logout();
    res.redirect('/');
  }
};

module.exports = AuthController;