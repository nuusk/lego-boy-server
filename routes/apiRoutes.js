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

  app.post('/api/increment', (req, res) => {
    let legoSetID = req.body.legoSetID;
    let brickID = req.body.brickID;

    db.incrementOwnedBricksNumber(legoSetID, brickID);
  });

  app.post('/api/decrement', (req, res) => {
    let legoSetID = req.body.legoSetID;
    let brickID = req.body.brickID;

    db.decrementOwnedBricksNumber(legoSetID, brickID);
  });


  app.get('/api/project/:id', (req, res) => {
    db.findProjectByID(req.params.id)
    .then(project => {
      res.send(project);
    });
  });

  app.get('/api/projects', (req, res) => {
    db.findProjects()
    .then(projects => {
      res.send(projects);
    })
  });
};