const products = require('../db/productsConst');
const { createServerError } = require('../utils/errorCreators');

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

module.exports = { isValidProductId, searchProductsByTitle, searchProductById };
