const fs = require("fs/promises");
const path = require("path");

async function getStopProduct(bloodType){
  const prod = await fs.readFile(path.join(__dirname, "../TestData/products.json"), 'utf8');

  const prodFilteredByBloodType = JSON.parse(prod).filter(item => !item.groupBloodNotAllowed[bloodType]);
  const stopProd = prodFilteredByBloodType.map(({_id, categories, weight, title, calories}) => ({_id, categories, weight, title, calories}));
   
  return stopProd;
};

module.exports = {getStopProduct};