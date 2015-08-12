/*
 * server.js
 */

var restify = require('restify');
var server = restify.createServer();

server.get('/', function(req, res) {
  res.json({
    message: 'Hello, world!',
  });
});

server.listen((process.env.PORT || 8000), function() {
  console.log('%s listening at %s', server.name, server.url);
});
