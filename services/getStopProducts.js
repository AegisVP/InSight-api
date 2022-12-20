const { Product } = require('../db/product.model');
const { createProdObj } = require('../utils/ProdListCreators');

async function getStopProduct(bloodType){

  const prod = await Product.find();

  const prodFilteredByBloodType = prod.filter(item => item.groupBloodNotAllowed[bloodType]);
  const stopProd = prodFilteredByBloodType.map(item=> createProdObj({product: item, weight: 100}));
   
  return stopProd;
};

module.exports = {getStopProduct};