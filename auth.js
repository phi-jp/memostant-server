/*
 *
 */


var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var config = require('./config');

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
  checkBearer: passport.authenticate('bearer', {session:false}),
};
