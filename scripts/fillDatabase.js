const fs = require('fs');
const Database = require('../services/Database');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const db = new Database();

const legoSetsImages = require('../data/lego-sets.json');
let i = 0 ;
const legoSetsFileNames = fs.readdirSync(__dirname + '/../data/sets/');
legoSetsFileNames.forEach(legoSetFileName => {
  legoSetFile = fs.readFileSync(`${__dirname}/../data/sets/${legoSetFileName}`, 'utf-8');
  let legoSet = { bricks: [] };
  try {
    let tmp = JSON.parse(legoSetFile);
    legoSet.legoSetId = tmp.Product.ProductNo;
    legoSet.name = tmp.Product.ProductName;
    legoSet.imageURL = tmp.ImageBaseUrl + tmp.Product.Asset;
    tmp.Bricks.forEach(brick => {
      let tmpBrick = {};
      tmpBrick.id = brick.DesignId;
      tmpBrick.name = brick.ItemDescr;
      tmpBrick.imageURL = tmp.ImageBaseUrl + brick.Asset;
      legoSet.bricks.push(tmpBrick);
    });
    console.log(legoSet);
  } catch (e) {
    console.log(e);
  }
});

// mongoose.connect(keys.mongoURI, () => {
//   console.log('Successfully connected to DB!');

//   products.forEach(product => {
//     // console.log(product);
//     db.addProduct(product);
//   });
// });
