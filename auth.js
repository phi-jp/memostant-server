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
    jwt.verify(token, config.secret, function(err, decoded) {
      // done(null);
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
