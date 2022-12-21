const { Product } = require('../db/product.model');
const { createProdObj } = require('../utils/ProdListCreators');

async function getStopProduct(bloodType) {
  return (await Product.find())
    .filter(item => item.groupBloodNotAllowed[bloodType])
    .map(item => createProdObj({ product: item, weight: item.weight || 100 }));
}

module.exports = { getStopProduct };
