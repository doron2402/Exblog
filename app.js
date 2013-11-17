
/**
 * Module dependencies.
 */

var express = require('express')
	,routes = require('./routes')
	,api = require('./routes/api')
	//Lib
	,Entry = require('./lib/entry')
	,messages = require('./lib/messages')
	//MiddleWares
	,user = require('./lib/middleware/user')
	,validate = require('./lib/middleware/validate')
	,page = require('./lib/middleware/page')
	,register = require('./routes/register')
	,entries = require('./routes/entries')
	,login = require('./routes/login')
	,http = require('http')
	,path = require('path')
	,app = express();

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
app.use('/api', api.auth) //When we use the API we need to Authenticate the user
app.use(user);
app.use(messages);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//API - REST
app.get('/api/user/:id', api.user);

app.get('/', page(Entry.count, 5), entries.list);

//Entries
app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]',4), entries.submit);

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
