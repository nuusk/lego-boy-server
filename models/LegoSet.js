const mongoose = require('mongoose');
const { Schema } = mongoose;

const LegoSetSchema = Schema({
  legoSetId: String,
  name: String,
  imageURL: String,
  bricks: [String]    // List of brick ID's
});

const LegoSet = mongoose.model('legoSets', LegoSetSchema);

module.exports = LegoSet;
