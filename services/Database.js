const LegoSet = require('../models/LegoSet');
const Brick = require('../models/Brick');

class Database {

  async addProduct(product) {
 
    Product.create({
      name: product.name,
      imageUrl: product.imageUrl,
      tags: product.tags,
      prices: product.prices,
      sizes: product.sizes,
      sex: product.sex
    })

  }

  findProductsByTag(tag) {
    return new Promise((resolve, reject) => {
      Product.find({ tags: tag })
        .then((res) => {
          resolve(res)
        });
    });
  }

  findProductById(productId) {
    return new Promise((resolve, reject) => {
      Product.findById(productId, (err, product) => {
        if (err) return console.error(err);
        resolve(product);
      });
    });
  }

  findProducts() {
    return new Promise((resolve, reject) => {
      Product.find({}, (err, products) => {
        if (err) return console.error(err);
        resolve(products);
      })
    })
  }

  findProductsByName(name) {
    return new Promise((resolve, reject) => {
      Product.find({
        name: { $in: name }
      }, (err, products) => {
        if (err) return console.error(err);
        resolve(products);
      });
    });
  }

  findSimilarProducts(sex, tags) {
    return new Promise((resolve, reject) => {
      Product.find({
        tags: { $in : tags },
        sex: { $in: ['unisex', sex] }
      }, (err, products) => {
        if (err) return console.error(err);
        resolve(products);
      });
    });
  }
}

module.exports = Database;
