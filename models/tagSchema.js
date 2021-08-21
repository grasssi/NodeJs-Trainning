const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const Tag = mongoose.model(
const tagSchema = new Schema({
  
    name: {String},
    slug: {String},
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tutorial"
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
});
const Tag = mongoose.model('tags', tagSchema);
module.exports = Tag;