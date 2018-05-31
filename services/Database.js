const LegoSet = require('../models/LegoSet');
const Brick = require('../models/Brick');

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

  async addBrick(brick) {
    Brick.create({
      brickID: brick.brickID,
      name: brick.name,
      imageURL: brick.imageURL
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


  findBrickByID(brickID) {
    return new Promise((resolve, reject) => {
      Brick.find({ brickID: brickID })
        .then((res) => {
          resolve(res)
        });
    });
  }

  findBrickByName(name) {
    return new Promise((resolve, reject) => {
      Brick.find({ name: name })
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


}

module.exports = Database;