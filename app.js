
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var user = require('./lib/middleware/user');
var register = require('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('SDFG#$@%TGSa08ujmn5@#$dfsg9b%#!'));
app.use(express.session());
app.use(user);
app.use(messages);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//Registration
app.get('/register', register.form);
app.post('/register', register.submit);

//Login
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
