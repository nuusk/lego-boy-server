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
  }]    // List of brick ID's
});

const LegoSet = mongoose.model('legoSets', LegoSetSchema);

module.exports = LegoSet;
