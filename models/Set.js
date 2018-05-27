const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetSchema = Schema({
  setId: String,
  name: String,
  imageURL: String,
  bricks: [String]    // List of brick ID's
});

const Set = mongoose.model('sets', SetSchema);

module.exports = Set;
