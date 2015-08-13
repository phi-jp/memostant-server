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
      if (err) {
        return done(err);
      }
      else if(decoded) {
        return done(null, decoded);
      }
      else {
        return done(null, false);
      }
    });
  }
));

module.exports = {
  me: function(req, res) {
    var sub = req.user.sub;
    var subs = sub.split('|');
    var select = {};
    select[subs[0]] = subs[1];

    var User = mongoose.model('User');
    var query = User.findOne(select);

    query.exec(function(err, user) {
      res.json({
        user: user,
      });
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
