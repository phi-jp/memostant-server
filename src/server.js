/*
 * server.js
 */

var restify = require('restify');
var router = require('./router.js');
var server = restify.createServer();

// setup server
server.use(restify.authorizationParser());
server.use(restify.bodyParser());
server.use(restify.queryParser());
// cross domain 対策
// http://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify
restify.CORS.ALLOW_HEADERS.push('authorization');
server.pre(restify.CORS());
server.use(restify.fullResponse());

// setup mongoose
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/'; 
var db = mongoose.connect(uristring);

// setup api
router(server);

server.listen((process.env.PORT || 8000), function() {
  console.log('%s listening at %s', server.name, server.url);
});
