const LegoSet = require('../models/LegoSet');
const Brick = require('../models/Brick');
const Project = require('../models/Project');

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
        .limit(1)
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

  async addProject(project) {
    return new Promise((resolve, reject) => {
      Project.create({
        legoSetID: project.legoSetID,
        name: project.name,
        bricks: project.bricks,
        lastModified: project.lastModified,
        isActive: project.isActive,
        isFavourite: project.isFavourite
      }, (err, newProject) => {
        if (err) console.error(err);
        resolve(newProject);
      });
    })
  }

  async removeProject(projectID) {
    return new Promise((resolve, reject) => {
      Project.find({
        legoSetID: projectID
      }).remove(()=>{
        resolve({message: 'Project successfully deleted.'});
      });
    });
  }

  findProjects() {
    return new Promise((resolve, reject) => {
      Project.find({}, (err, projects) => {
        if (err) return console.error(err);
        resolve(projects);
      });
    });
  }

  findProjectByID(projectID) {
    return new Promise((resolve, reject) => {
      Project.find({ legoSetID: projectID }, (err, project) => {
        if (err) return console.error(err);
        resolve(project);
      });
    });
  }

  incrementOwnedBricksNumber(legoSetID, brickID) {
    return new Promise((resolve, reject) => {
      Project.update(
        { legoSetID: legoSetID, "bricks.brickID": brickID },
        { 
          $inc: { "bricks.$.ownedQuantity": 1 },
          $set: { "lastModified": new Date().toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }) }
        },
        (err) => {
          if (err) return console.error(err);
          Project.find({ legoSetID: legoSetID }, (err, project) => {
            if (err) return console.error(err);
            resolve(project);
          }); 
        }
      );
    }); 
  }

  decrementOwnedBricksNumber(legoSetID, brickID) {
    return new Promise((resolve, reject) => {
      Project.update(
        { legoSetID: legoSetID, "bricks.brickID": brickID },
        { 
          $inc: { "bricks.$.ownedQuantity": -1 },
          $set: { "lastModified": new Date().toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }) }
        },
        (err) => {
          if (err) return console.error(err);
          Project.find({ legoSetID: legoSetID }, (err, project) => {
            if (err) return console.error(err);
            resolve(project);
          }); 
        }
      );
    }); 
  }

  activateProject(legoSetID) {
    return new Promise((resolve, reject) => {
      Project.update(
        { legoSetID: legoSetID },
        {  $set: { isActive: true } },
        (err) => {
          if (err) return console.error(err);
          Project.find({ legoSetID: legoSetID }, (err, project) => {
            if (err) return console.error(err);
            resolve(project);
          }); 
        }
      );
    }); 
  }

  deactivateProject(legoSetID) {
    return new Promise((resolve, reject) => {
      Project.update(
        { legoSetID: legoSetID },
        {  $set: { isActive: false } },
        (err) => {
          if (err) return console.error(err);
          Project.find({ legoSetID: legoSetID }, (err, project) => {
            if (err) return console.error(err);
            resolve(project);
          }); 
        }
      );
    }); 
  }

}


module.exports = Database;