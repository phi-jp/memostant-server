/*
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({
  'google-oauth2': String,

  score: Number,
  name: { type: String, required: true },
  screen_name: String,
  admin: Boolean,
  description: String,

  notes : [{ type: Schema.ObjectId, ref: 'Note' }],
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
      name: req.params.name,
      admin: true,
    });
    // auth key を登録
    var subs = req.user.sub.split('|');
    user[subs[0]] = subs[1];

    user.save(function(err, data) {
      res.send({
        user: data,
      });
    });
  },
  update: function(req, res) {
    res.send("update");
  },
};
