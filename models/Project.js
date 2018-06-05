const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = Schema({
  legoSetID: Number,
  name: String,
  bricks: [{
    brickID: Number,
    name: String,
    imageURL: String,
    ownedQuantity: Number,
    requiredQuantity: Number
  }],
  lastModified: Date,
  isActive: Boolean,
  isFavourite: Boolean
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
