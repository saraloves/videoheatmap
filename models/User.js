var Sequelize = require('sequelize'),
  // ObjectId = mongoose.Schema.Types.ObjectId,
  PassportLocalStrategy = require('passport-local').Strategy;
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

var User = sequelize.define('auth', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.sync();

/* Auth properties      ---------------------------*/
/* (passport)           ---------------------------*/

// This is your main login logic
var authTable = {};
authTable.localStrategy = new PassportLocalStrategy({
        username: 'username',
        password: 'password',
    },

    // @see https://github.com/jaredhanson/passport-local
    function (username, password, done){
        var User = require('./User').User;
        User.find({username: username}).success(function(user){
            if (!user){
                return done(null, false, { message: 'User not found.'} );
            }
            if (user.password !== password){
                return done(null, false, { message: 'Incorrect password.'} );
            }
            return done(null, {
                id: user._id,
                name: user.name,
                image: user.image,
                username: user.username,
            });
        });
    }
);

authTable.validPassword = function(password){
    if (this.password == password){
        return true;
    }

    return false;
}

authTable.serializeUser = function(user, done){
    done(null, user);
};

authTable.deserializeUser = function(obj, done){
    done(null, obj);
};

module.exports.authTable = authTable;
module.exports.User = User;