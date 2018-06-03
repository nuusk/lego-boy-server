
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserProfileSchema = Schema({
  userID: String,
  nickName: String,
  avatarURL: String,
  dateJoined: Date,
  lastLoginDate: Date
});

const UserProfile = mongoose.model('userprofiles', UserProfileSchema);

module.exports = UserProfile;
