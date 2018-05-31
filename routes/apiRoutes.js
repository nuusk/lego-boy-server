const mongoose = require('mongoose');
const Database = require('../services/Database');
const db = new Database();

const FANCY_TIMER = 1000;

module.exports = (app) => {

  app.get('/api/legosets', (req, res) => {
    db.findLegoSets()
      .then(legosets => {
        res.send(legosets);
    });
  });

  app.get('/api/bricks', (req, res) => {
    db.findBricks()
      .then(bricks => {
        res.send(bricks);
    });
  });

  // TODO route for products/name

  app.get('/api/products/sex/:sex/tag/:tag', (req, res) => {
    const sex = req.params.sex;
    const tags = req.params.tag.split('&');

    setTimeout(()=>{
      db.findSimilarProducts(sex, tags)
      .then(products => {
        res.send(products);
      });
    }, FANCY_TIMER)

  });

  // TODO work on that, both on server and client.
  app.get('/api/products/name/:name', (req, res) => {
    const name = req.params.name.split('&');

    setTimeout(()=>{
      db.findProductsByName(name)
      .then(products => {
        res.send(products);
      });
    }, FANCY_TIMER)

  });
};