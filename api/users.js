/*
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var userSchema = new Schema({
  score: Number,
  name: { type: String, required: true },
  screen_name: String,
  password: String, 
  admin: Boolean,
  description: String,

  notes : [{ type: Schema.ObjectId, ref: 'Note' }],
});

// モデルを生成
mongoose.model('User', userSchema);
var User = mongoose.model('User');


module.exports = {
  setup: function(req, res) {

  },

  index: function(req, res) {
    User.find({}, ['name', 'screen_name'].join(' '), function(err, data) {
      res.send({
        users: data,
      });
    });
  },
}