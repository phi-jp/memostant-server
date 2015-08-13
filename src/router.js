
var auth = require('./auth.js');
var users = require('./api/users.js');
var notes = require('./api/notes.js');


function router(server) {
  // root
  server.get('/', function(req, res) {
    res.json({
      message: 'Hello, world!',
    });
  });

  // general
  server.get('/me', auth.checkBearer, auth.me);
  server.post('/login', auth.login);
  server.get('/auth', auth.checkBearer, function(req, res) {
    var sub = req.user.sub;
    res.json({
      user: req.user,
    });
  });

  // user
  server.get('/users', users.index);
  server.get('/users/:name', users.show);
  server.post('/users', auth.checkBearer, users.create);
  server.put('/users/:id', auth.checkBearer, users.update);

  // note
  server.get('/notes', notes.index);
  server.get('/notes/:id', notes.show);
  server.post('/notes', auth.checkBearer, notes.create);
  server.put('/notes/:id', auth.checkBearer, notes.update);
  server.del('/notes/:id', auth.checkBearer, notes.destroy);

};

module.exports = router;