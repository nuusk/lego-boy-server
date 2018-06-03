const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserCollectionSchema = Schema({
  userID: String,
  projects: [{
    legoSetID: String,
    ownedBricks: [{
      brickID: String,
      quantity: Number
    }],
    lastModified: Date,
    isActive: Boolean,
    isFavourite: Boolean
  }]
});

const UserCollection = mongoose.model('usercollections', UserCollectionSchema);

module.exports = UserCollection;
