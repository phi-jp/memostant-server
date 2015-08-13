/*
 * server.js
 */

var restify = require('restify');
var server = restify.createServer();

// setup server
server.use(restify.bodyParser());
server.use(restify.queryParser());
// cross domain 対策
// http://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify
server.use(restify.CORS());
server.use(restify.fullResponse());

// setup mongoose
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/'; 
var db = mongoose.connect(uristring);

// setup api
var auth = require('./auth.js');
var users = require('./api/users.js');
var notes = require('./api/notes.js');

server.get('/', function(req, res) {
  res.json({
    message: 'Hello, world!',
  });
});
server.post('/me', auth.checkBearer, auth.me);
server.post('/login', auth.login);

server.get('/users', users.index);
server.get('/users/:name', users.show);
server.post('/users', auth.checkBearer, users.create);

server.get('/notes', notes.index);
server.post('/notes', auth.checkBearer, notes.create);

server.get('/auth', auth.checkBearer, function(req, res) {
  var sub = req.user.sub;
  console.log(sub);
  res.json({
    user: req.user,
  });
});

server.listen((process.env.PORT || 8000), function() {
  console.log('%s listening at %s', server.name, server.url);
});
