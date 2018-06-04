const fs = require('fs');
const Database = require('../services/Database');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const db = new Database();

// Toggle only the collections that you actually want to fill in mLab
const FILLING_USER_PROFILES = true;

mongoose.connect(keys.mongoURI, () => {
  console.log('Successfully connected to DB!');

  if (FILLING_USER_PROFILES) {
    const newUser = {
      userID: 44,
      nickName: 'poe',
      avatarURL: 'https://thumbs-prod.si-cdn.com/rFEKsg_sHwvVPLc5KnrXPkJAaf0=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/c0/b4/c0b41ae2-b449-4157-a874-34f78c0279ee/poe-portrait.jpg',
      dateJoined: new Date().toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }),
      lastLoginDate: new Date().toLocaleString('en-US', { timeZone: 'Europe/Warsaw' })
    }
    
    db.addUserProfile(newUser);
    db.addUserCollection(newUser);
    console.log('Filled user profile && colelctions!');
  }  
});