const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = Schema({
  legoSetID: String,
  ownedBricks: [{
    brickID: Number,
    quantity: Number
  }],
  lastModified: Date,
  isActive: Boolean,
  isFavourite: Boolean
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
