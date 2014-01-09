var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var user = require('../models/User');

var AuthController = {
    // Login a user
  login: passport.authenticate('local'),
  register: function(req, res){
    user.register(req, res);
  },

  // Log out a user
  logout: function(req, res){
    req.logout();
    var path = req.headers.referer.split('/');
    var subdomain = path[path.length-1];
    if(subdomain === 'admin'){
      res.redirect('/');
    } else {
      res.redirect(req.headers.referer);
    }
  },
  restrict: function(req, res, next){
    if (!req.user) {
      res.redirect('/');
    } else {
      next();
    }
  },
  redirect: function(req, res) {
    res.redirect(req.headers.referer);
  }
};

module.exports = AuthController;