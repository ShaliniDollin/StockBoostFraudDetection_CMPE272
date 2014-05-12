var path = require("path");
var twit = require('twit');
var sentimental = require('Sentimental');

var async = require('async');
var finance= require('yahoo-finance');
var ejs = require('ejs');

var fs = require('fs');


var app = require('../app');
var neutral = 0;
var positive = 0;
var negative = 0;




exports.index = function(req, res){
	res.render('index', { title: 'Stock Fraud Detection' });
};
exports.volumecall = function(req, res){
	console.log('In volume call');
	res.render('volume', { title: 'Stock Fraud Detection' , stock: req.param('stock') });
};
exports.scorecall = function(req, res){
	console.log('In score call');
	res.render('score', { title: 'Stock Fraud Detection' , stock: req.param('stock') });
};
exports.graphhome = function(req, res){
	console.log('In graphhome call');
	res.render('graphhome', { title: 'Stock Fraud Detection' , stock: req.param('stock') });
};
exports.pricecall = function(req, res){
	console.log('In price call');
	
	res.render('graphhome', { title: 'Stock Fraud Detection' , stock: req.param('stock') });
};

exports.getopinion = function(req,res) {
	res.render('opinion', { title: 'StockGraph', stock :req.param('stock')});
};
exports.livedata = function(req, res){
	console.log("In live");
	ejs.renderFile('./views/livedata.ejs', { title: 'Live Data Your Stock' },function(err,results){

		if(!err)
		{
			res.end(results);
		}
	});
};
exports.whyus = function(req, res){
	console.log("In why");
	ejs.renderFile('./views/why.ejs', { title: 'Why US' },function(err,results){

		if(!err)
		{
			res.end(results);
		}
	});
};
exports.check = function(req, res){
	console.log("In Check");
	ejs.renderFile('./views/check.ejs', { title: 'Search Your Stock' },function(err,results){

		if(!err)
		{
			res.end(results);
		}
	});
};


exports.price = function(req,res){
	console.log("In price" + req.param("stock"));
	finance.historical({
		symbol: req.param("stock"),
		from: '2014-04-28',
		to: '2014-05-11'
	}, function (err, quotes, url, symbol) {
		//console.log(JSON.stringify(quotes));
		res.send( JSON.stringify(quotes));
	});

};
exports.volume = function(req,res){
	console.log("In price" + req.param("stock"));
	finance.historical({
		symbol: req.param("stock"),
		from: '2014-04-28',
		to: '2014-05-11'
	}, function (err, quotes, url, symbol) {
		//console.log(JSON.stringify(quotes));
		res.send( JSON.stringify(quotes));
	});

};

exports.opinion = function(req,res) {
	console.log("hi2");
	var stockQuote = req.param("stock");
	console.log("STOCK:" +stockQuote);




	function getAndScoreTweets1(stockQuote, callback) {
		app.twitter.get('search/tweets', {q: stockQuote,count:1000}, function(err, data) {
			// perfrom sentiment analysis (see below)
			if(err) {
				console.log(err);
				callback(err.message, undefined);
				return;
			}
			//console.log(data['statuses']);
			var tweetSet = data['statuses'];
			var pos=[];
			var k=0, m=0, n=0, l=0, p=0;
			var neg =[];
			var j=0, g=0, a=0, b=0, c=0;
			var posretweet =[];
			var negretweet =[];
			var posname = [];
			var negname=[];
			var posfriend = [];
			var negfriend=[];
			var posfollow = [];
			var negfollow=[];
			console.log("tweet", +tweetSet.length);
			//tweetSet JSON Object contains all the tweets.This has to be used for rendering the graphs on the UI
			for(var i = 0; i < tweetSet.length; i++)
			{

				//console.log(tweetSet[i]['created_at'].date("YYYY-MM-DD"));
				var tweet = tweetSet[i]['text'];
				var retweets = tweetSet[i]['retweet_count'];
				var name = tweetSet[i]['id'];
				tweet = tweet.replace('#', '');
				//console.log(name);
				var score = sentimental.analyze(tweet)['score'];
				if(score>0){
					pos[k++]=score;

					posretweet[l++]=retweets;
					posname[m++]=name;
					posfriend[g++]=tweetSet[i]['user']['friends_count'];
					posfollow[a++]=tweetSet[i]['user']['followers_count'];
					//	console.log("output", +tweetSet[i]['user']['name']);
					//	console.log("output1", +posname);

				}
				else if(score<0){
					neg[j++]=score;
					negretweet[p++] =retweets;
					negname[n++]=name;
					negfriend[b++]=tweetSet[i]['user']['friends_count'];
					negfollow[c++]=tweetSet[i]['user']['followers_count'];
				}
				//console.log("retweets:" + retweets);
				//console.log(tweetSet[i]['user']['name']);
				//	getStockData("","",stockQuote);
			}



			var postotal=[];
			var negtotal=[];
			for(var i=0;i<pos.length;i++){
				postotal[i]=(pos[i]*100)+(posretweet[i]*100)+(posfriend[i]/100)+(posfollow[i]/100);
			}
			for(var i=0;i<neg.length;i++){
				negtotal[i]=((neg[i]*100)+(negretweet[i]*100)+(negfriend[i]/100)+(negfollow[i]/100));
			}
			var people = [];
			var name;
			for(var s in postotal) {

				var total = postotal[s];
				var id = posname[s];
				for(var j = 0; j < tweetSet.length; j++)
				{
					name= ' ';
					if(tweetSet[j]['id'] == id)
					{
						name=tweetSet[j]['user']['screen_name'];
						break;
					}
				}

				people.push({ 
					"ID" : id,
					"Name" : name,
					"Total" : total 
				});
			}
			//console.log(JSON.stringify(people));
			res.send( JSON.stringify(people));



		});

	}
	async.map(stockQuote, getAndScoreTweets1, function(err, scores) {
		console.log(stockQuote);
		if(err) {
			console.log("Unable to score all tweets");
			res.end(JSON.stringify(err));
		}
	});

};

exports.getscore = function(req,res) {

	//var stockQuote = req.param("stock");
	var stockQuote = req.param('stock');
	console.log("STOCK:" + stockQuote);




	function getAndScoreTweets(stockQuote, callback) {
		app.twitter.get('search/tweets', {q: stockQuote + ' stock since:2014-4-28',count:1000}, function(err, data) {
			// perfrom sentiment analysis (see below)
			if(err) {
				console.log(err);
				callback(err.message, undefined);
				return;
			}
			//console.log(data['statuses']);
			var tweetSet = data['statuses'];
			//console.log(tweetSet.length);
			//console.log(tweetSet);

			console.log("DATA:" + data);



			//tweetSet JSON Object contains all the tweets.This has to be used for rendering the graphs on the UI
			for(var i = 0; i < tweetSet.length; i++)
			{

				//console.log(tweetSet[i]['created_at'].date("YYYY-MM-DD"));
				var tweet = tweetSet[i]['text'];
				var retweets = tweetSet[i]['retweet_count'];
				tweet = tweet.replace('#', '');
				// perfrom sentiment on the text
				//console.log(tweetSet[i]);
				var score = sentimental.analyze(tweet)['score'];

				if(score == 0)
				{
					neutral++;
				}
				else if(score == 1)
				{
					positive++;
				}
				else if(score == 2)
				{
					positive++;
				}
				else if(score == 3)
				{
					positive++;
				}
				else if(score == 4)
				{
					positive++;
				}
				else if(score == -1)
				{
					negative++;
				}
				else if(score == -2)
				{
					negative++;
				}
				else if(score == -3)
				{
					negative++;
				}
				else if(score == -4)
				{
					negative++;
				}



				var tweetScore = [];
				tweetScore.push({ 
					"score" : "positive",
					"value" : positive
				},{ 
					"score" : "neutral",
					"value" : neutral
				},{ 
					"score" : "negative",
					"value" : negative
				});


				//console.log("JSON saved to " + outputFilename);
				res.send(JSON.stringify(tweetScore));



			}
		});
	}
	
	async.map(stockQuote, getAndScoreTweets, function(err, scores) {
		console.log(stockQuote);
		if(err) {
			console.log("Unable to score all tweets");
			res.end(JSON.stringify(err));
		}
	});


};
