
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var twit = require('twit');
var app = express();
var finance= require('yahoo-finance');
var config = require("./config");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var twitter = new twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});


app.post('/vcall', routes.volumecall);
app.get('/vcall', routes.volumecall);
app.post('/pcall', routes.pricecall);
app.get('/scorecall', routes.scorecall);
app.get('/getopinion', routes.getopinion);
app.post('/graphhome', routes.graphhome);
app.get('/graphhome', routes.graphhome);
app.get('/', routes.index);
app.get('/why', routes.whyus);
app.get('/stock', routes.livedata);
app.get('/check', routes.check);
app.get('/getscore', routes.getscore);
app.get('/vol', routes.volume);
app.get('/price', routes.price);
app.get('/opinion',routes.opinion);

exports.twitter = twitter;


app.listen(app.get('port'), function(){
  console.log('Express server listening on //port ' + app.get('port'));
});
