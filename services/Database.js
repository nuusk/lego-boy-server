const LegoSet = require('../models/LegoSet');
const Brick = require('../models/Brick');

class Database {

  async addLegoSet(legoSet) {
    LegoSet.create({
      legoSetID: legoSet.legoSetID,
      name: legoSet.name,
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
      LegoSet.find({ name: name })
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
      });
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
      });
    });
  }


}

module.exports = Database;