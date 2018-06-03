const mongoose = require('mongoose');
const Database = require('../services/Database');
const db = new Database();

const FANCY_TIMER = 1000;

module.exports = (app) => {

  app.get('/api/legoSets', (req, res) => {
    db.findLegoSets()
      .then(legoSets => {
        res.send(legoSets);
    });
  });

  app.get('/api/bricks', (req, res) => {
    db.findBricks()
      .then(bricks => {
        res.send(bricks);
    });
  });

  // TODO route for products/name

  app.get('/api/legoSet/:id', (req, res) => {
    const id = req.params.id;
    db.findLegoSetByID(id)
    .then(legoSet => {
      res.send(legoSet);
    });
  });

  app.get('/api/legoSets/name/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    db.findLegoSetByName(name)
    .then(legoSets => {
      res.send(legoSets);
    });
  });

  app.get('/api/brick/:id', (req, res) => {
    const id = req.params.id;
    db.findBrickByID(id)
    .then(brick => {
      res.send(brick);
    });
  });

  app.post('/login', (req, res) => {
    db.findUserByNickName(req.body.nickName)
    .then(user => {
      res.send(user);
    });
  });

  app.post('/register', (req, res) => {
    let user = {
      userID: Math.ceil(Math.random()*400000000),
      nickName: req.body.nickName,
      avatarURL: 'http://static.tumblr.com/3bb886fed6db1e0e5ff65313247acaab/a0mxml5/IG5o8jgvg/tumblr_static_p6p0ifmzvkg884kwcc8cg8ck.png',
      dateJoined: new Date(),
      lastLoginDate: new Date()
    }
    db.addUserProfile(user);
  });

  // app.post('/api/increment', (req, res) => {
  //   let userID = req.body.userID;
  //   let legoSetID = req.body.legoSetID;
  //   let brickID = req.body.brickID;

  //   db.incrementBrickNumberInProject(userID, legoSetID, brickID)
  //   .then(numBricks => {
  //     res.send(numBricks);
  //   })
  // });

  app.get('/api/increment', (req, res) => {
    let userID = 44;
    let legoSetID = 10015;
    let brickID = 3795;

    db.incrementBrickNumberInProject(userID, legoSetID, brickID);
    console.log('asd');
  });

  app.post('/api/decrement', (req, res) => {
    let userID = req.body.userID;
    let legoSetID = req.body.legoSetID;
    let brickID = req.body.brickID;

    db.decrementBrickNumberInProject(userID, legoSetID, brickID)
    .then(numBricks => {
      res.send(numBricks);
    })
  });

  app.get('/api/collection/:userID', (req, res) => {
    db.findUserCollections(req.params.userID)
    .then(collection => {
      res.send(collection);
    })
  });
};