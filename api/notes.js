/*
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
var scheme = new Schema({
  _creator : { type: Schema.ObjectId, ref: 'User' },
  title: String,
  content: String,
});

// モデルを生成
mongoose.model('Note', scheme);
var Note = mongoose.model('Note');


module.exports = {
  index: function(req, res) {
    var query = Note
      .find({
        // '_creator.name': 'phi',
      })
      .populate('_creator', 'name')
      ;

    query.exec(function(err, data) {
        res.send({
          posts: data,
        });
      });
  },
  show: function(req, res) {
    // TODO:
  },
  create: function(req, res) {
    var note = new Note({
      _creator: req.user._id,
      title: req.params.title,
      content: req.params.content,
    });

    note.save(function(err, note) {
      if (err) return handleError(err);
      res.send({
        note: note,
      });
    });
  },
  update: function(req, res) {
    var user = req.user;

    res.send("update");
  },
};
