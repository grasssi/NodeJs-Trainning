const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  title: { String },
  author: { String },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});
const Tutorial = mongoose.model('tutos', tutorialSchema);
module.exports = Tutorial;