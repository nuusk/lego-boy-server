const LegoSet = require('../models/LegoSet');
const Brick = require('../models/Brick');
const UserProfile = require('../models/UserProfile');
const UserCollection = require('../models/UserCollection');

const FIND_ALL_LIMIT = 20;
const FIND_QUERY_LIMIT = 20;

class Database {

  async addLegoSet(legoSet) {
    LegoSet.create({
      legoSetID: legoSet.legoSetID,
      name: legoSet.name,
      tags: legoSet.tags,
      imageURL: legoSet.imageURL,
      bricks: legoSet.bricks
    });
  }

  findLegoSetByID(legoSetID) {
    return new Promise((resolve, reject) => {
      LegoSet.find({ legoSetID: legoSetID })
        .then((res) => {
          resolve(res)
        });
    });
  }

  findLegoSetByName(name) {
    return new Promise((resolve, reject) => {
      LegoSet.find( { tags: { $in: name } } )
        .limit(FIND_QUERY_LIMIT)
        .then((res) => {
          resolve(res)
        });
    });
  }

  findLegoSets() {
    return new Promise((resolve, reject) => {
      LegoSet.find({}, (err, legoSets) => {
        if (err) return console.error(err);
        resolve(legoSets);
      }).limit(FIND_ALL_LIMIT);
    });
  }

  async addBrick(brick) {
    Brick.create({
      brickID: brick.brickID,
      name: brick.name,
      imageURL: brick.imageURL
    });
  }

  findBrickByID(brickID) {
    return new Promise((resolve, reject) => {
      Brick.find({ brickID: brickID })
        .then((res) => {
          resolve(res)
        });
    });
  }

  findBricks() {
    return new Promise((resolve, reject) => {
      Brick.find({}, (err, bricks) => {
        if (err) return console.error(err);
        resolve(bricks);
      }).limit(FIND_ALL_LIMIT);
    });
  }

  async addUserProfile(user) {
    UserProfile.create({
      userID: user.userID,
      nickName: user.nickName,
      avatarURL: user.avatarURL,
      dateJoined: user.dateJoined,
      lastLoginDate: user.lastLoginDate
    });
  }


  findUserByNickName(nickName) {
    return new Promise((resolve, reject) => {
      UserProfile.find({ nickName: nickName }, (err, user) => {
        if (err) return console.error(err);
        resolve(user);
      }).limit(1);
    });
  }

  // TOP SECRET...
  findUsers() {
    return new Promise((resolve, reject) => {
      UserProfile.find({}, (err, users) => {
        if (err) return console.error(err);
        resolve(bricks);
      });
    });
  }

  async addUserCollection(user) {
    UserCollection.create({
      userID: user.userID,
      projects: []
    });
  }

  async addProjectToUserColection(userID, project) {
    UserCollection.update(
      { userID: userID }, 
      { $push: { projects: project } },
      () => {
        console.log('Added project to user collection.');
      }
    );
    console.log(userID, project);
  }

  incrementBrickNumberInProject(userID, legoSetID, brickID) {
    UserCollection.update(
      { userID: "44" },
      { $set: { "projects.$[l].ownedBricks.$[b].quantity": 4 } },
      { arrayFilters: [ { "l.legoSetID": "10015" }, { "b.brickID": "3795" } ], multi: true },
      () => {
        UserCollection.find(
          {userID: "44"},
          { arrayFilters: [ { "l.legoSetID": "10015" }, { "b.brickID": "3795" } ] },
          (err, user) => {
          console.log(user);
        })
      }
    );
  }

  findUserCollections(userID) {
    return new Promise((resolve, reject) => {
      UserCollection.find({ userID: userID }, (err, collection) => {
        if (err) return console.error(err);
        resolve(collection);
      });
    });
  }
  
  
}

module.exports = Database;

// {
//   gameName: "string",
//   slug: "string",
//   players: [ { playerName: "string", playerScore: number} ] , ...]
//  }
// db.collection.update( 
//   {"players.playerName":"Joe"},
//   { $inc : { "players.$.playerScore" : 1 } 
// }
