var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: Number, required: true},
  description: {type: String},
  link: String,
});

module.exports = mongoose.model('Post', PostSchema);