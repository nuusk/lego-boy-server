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

    db.incrementOwnedBricksNumber(legoSetID, brickID)
    .then(project => {
      res.send(project);
    });;
  });

  app.post('/api/decrement', (req, res) => {
    let legoSetID = req.body.legoSetID;
    let brickID = req.body.brickID;

    db.decrementOwnedBricksNumber(legoSetID, brickID)
    .then(project => {
      res.send(project);
    });
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

  app.get('/info', (req, res) => {
    res.send("<ul><li><h2>'/api/legoSets'</h2><h3> GET </h3><p> get all legoSets </p></li><li><h2>'/api/bricks'</h2><h3> GET </h3><p> get all bricks</p></li><li><h2>'/api/legoSet/:id'</h2><h3> GET </h3><p> get legoSet with given ID</p></li><li><h2>'/api/legoSets/name/:name </h2><h3> GET </h3><p> search legoSet by name </p></li><li><h2>'/api/brick/:id'</h2><h3> GET </h3><p> get brick with given ID </p></li><li><h2>'/api/project/:id'</h2><h3> GET </h3><p> get project with given ID </p></li><li><h2>'/api/projects'</h2><h3> GET<p> get all projects' </p></li><li><h2> /api/increment' </h2><h3> POST </h3><p> increment owned blocks for specific project <br/> in body include legoSetID and brickID </p></li><li><h2>'/api/decrement'</h2><h3> POST </h3><p> decrement owned blocks for specific project <br/> in body include legoSetID and brickID </p></li></ul>");
  })
};