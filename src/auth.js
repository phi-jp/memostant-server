/*
 *
 */


var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var config = require('./config');

var mongoose = require('mongoose');

// setup passport
passport.use(new BearerStrategy({
  },
  function(token, done) {
    var secret = new Buffer(config.secret, 'base64');
    jwt.verify(token, secret, { audience: 'OkDgBFuMfTt6iKz0fLQ1IAUm9zftz9TW' }, function(err, decoded) {
      var sub = decoded.sub;
      var subs = sub.split('|');
      var q = {};
      q[subs[0]] = subs[1];

      var User = mongoose.model('User');
      var query = User.findOne(q);

      query.exec(function(err, user) {
        if (err) {
          return done(err);
        }
        else if(user) {
          return done(null, user);
        }
        else {
          return done(null, sub);
        }
      });

    });
  }
));

module.exports = {
  me: function(req, res) {
    var user = null;
    if (typeof req.user === 'object') {
      user = req.user;
    }
    res.json({
      user: user,
    });
  },
  login: function(req, res) {
    var User = mongoose.model('User');
    User.findOne({
      name: req.body.name,
    }, function(err, user) {
      if (user.password !== req.body.password) {
        res.json('error');
        return ;
      }

      var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 1440,
      });

      res.json({
        token: token,
      });
    });
  },
  checkBearer: passport.authenticate('bearer', {session:false}),
};
