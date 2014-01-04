/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var express = require('express');
var routes = require('./routes');
var database = require('./controllers/database');
var http = require('http');
var path = require('path');
var cors = require('cors');
// use passport
var passport = require('passport');
var User = require('./models/User.js').authTable;

passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

var app = express();
var auth = require('./controllers/authController.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('qwertyyui'));
app.use(express.bodyParser());
app.use(cors());
app.use(express.methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//passport environments
app.use(flash());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
//this line needs to be after app.use(flash())
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/votes', database.createVote);


//use passport to authenticate any login attempts
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);
app.get('/auth/login/success', auth.loginSuccess);
app.get('/auth/login/failure', auth.loginFailure);


app.get('/votes/:vidID', database.getVotes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});