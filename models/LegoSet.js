const mongoose = require('mongoose');
const { Schema } = mongoose;

const LegoSetSchema = Schema({
  legoSetID: String,
  name: String,
  imageURL: String,
  bricks: [{
    id: String,
    name: String,
    imageURL: String
  }],
  tags: [String]          // for finding lego set by name ('tags' is just an array of words from the name)
});

const LegoSet = mongoose.model('legoSets', LegoSetSchema);

module.exports = LegoSet;
