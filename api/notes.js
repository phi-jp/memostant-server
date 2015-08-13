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
  created:    { type: Date, default: Date.now },
  updated:    { type: Date, default: Date.now },
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
        notes: data,
      });
    });
  },
  show: function(req, res) {
    Note.findOne({
      _id: req.params.id,
    }, function(err, data) {
      res.json({
        note: data,
      });
    });
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

    Note.findOne({
      _id: req.params.id,
    }, function(err, note) {
      note.title = req.params.title;
      note.content = req.params.content;
      note.updated = new Date();

      note.save(function(err, note) {
        res.json({
          note: note,
        });
      });
    });
  },
  destroy: function(req, res) {
    Note.remove({_id: req.params.id}, function(err) {
      if (err) {
        res.json('error');
      }
      else {
        res.json('success');
      }
    });
  },
};
