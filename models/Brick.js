const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrickSchema = Schema({
  brickID: String,
  name: String,
  imageURL: String
});

const Brick = mongoose.model('Bricks', BrickSchema);

module.exports = Brick;
