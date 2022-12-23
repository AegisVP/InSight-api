const products = require('../db/productsConst');
const { createProdObj } = require('../utils/ProdListCreators');
const { createServerError } = require('../utils/errorCreators');

const getStopProduct = async bloodType => {
  return products.items
    .filter(item => item.groupBloodNotAllowed[bloodType])
    .map(item => createProdObj({ product: item, weight: item.weight || 100 }));
}

const isValidProductId = async productId => {
  try {
    const product = await products.items.filter(({_id})=>_id.toString() === productId);
    return !!product;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const searchProductsByTitle = async searchQuery => {
  try {
    const searchTitle = new RegExp(searchQuery, 'gi');
    const productsArr = await products.items.filter(({title})=>{return title.ua.match(searchTitle) || title.ru.match(searchTitle)});
    return productsArr;
  } catch (err) {
    throw createServerError(err.message);
  }
}

const searchProductById = async productId => {
  try {
    const [product] = await products.items.filter(({_id})=>_id.toString() === productId);
    return product;
  } catch (err) {
    throw createServerError(err.message);
  }
}

module.exports = { isValidProductId, searchProductsByTitle, searchProductById, getStopProduct};
