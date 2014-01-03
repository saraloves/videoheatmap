var Sequelize = require('sequelize'),
  PassportLocalStrategy = require('passport-local').Strategy;
var pg = require('pg').native;
var config = require('../db_config');
var passport = require('passport');
var User = require('../models/User');

var AuthController = {

    // Login a user 
    login: passport.authenticate('local', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failure'
    }),

    register: function(req, res){
      var User = require('../models/User').User;
      User.sync();
      User.find({username: req.body.username}).success(function(user){
        if (!user){
          User.create({username: req.body.username, password: req.body.password}, function(err){
            if (err) {
              console.log(err);
              res.json({
                  success:false, 
                  message: 'Invalid username or password.'
              });
              return;
            }
          });
        }
        else {
          res.json({
              success:false, 
              message: 'Username already exists'
          });
        }

            // I'm specifying the fields that I want to save into the user's session
            // *I don't want to save the password in the session
            // return done(null, {
            //     id: user._id,
            //     name: user.name,
            //     image: user.image,
            //     username: user.username,
            // });
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
    },

};

exports = module.exports = AuthController;