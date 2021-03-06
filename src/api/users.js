/*
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({

  name: { type: String, required: true, unique: true, },
  screen_name: String,
  admin: Boolean,
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  
  'auth0': String,
  'google-oauth2': String,
});

// モデルを生成
mongoose.model('User', userSchema);
var User = mongoose.model('User');


module.exports = {
  index: function(req, res) {
    User.find({}, ['name', 'screen_name'].join(' '), function(err, data) {
      res.send({
        users: data,
      });
    });
  },
  show: function(req, res) {
    User.findOne({
      name: req.params.name,
    }, function(err, user) {
      res.json({
        user: user,
      });
    });
  },
  create: function(req, res) {
    var user = new User({
      admin: true,
    });

    user.name = req.params.name;
    user.description = req.params.description;

    var subs = req.user.split('|');
    user[subs[0]] = subs[1];

    user.save(function(err, data) {
      res.send({
        user: data,
      });
    });
  },
  update: function(req, res) {
    var user = req.user;

    user.name = req.params.name;
    user.description = req.params.description;

    user.save(function(err, data) {
      res.send({
        user: data,
      });
    });
  },
};
