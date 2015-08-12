/*
 * server.js
 */

var restify = require('restify');
var server = restify.createServer();

// setup mongoose
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/'; 
var db = mongoose.connect(uristring);
// api
var users = require('./api/users.js');

server.get('/', function(req, res) {
  res.json({
    message: 'Hello, world!',
  });
});

server.get('/users', users.index);

server.listen((process.env.PORT || 8000), function() {
  console.log('%s listening at %s', server.name, server.url);
});
