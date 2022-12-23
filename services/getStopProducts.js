const products = require('../db/productsConst');
const { createProdObj } = require('../utils/ProdListCreators');

async function getStopProduct(bloodType) {
  return products.items
    .filter(item => item.groupBloodNotAllowed[bloodType])
    .map(item => createProdObj({ product: item, weight: item.weight || 100 }));
}

module.exports = { getStopProduct };
