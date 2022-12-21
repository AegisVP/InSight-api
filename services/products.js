const { Product } = require('../db/product.model');
const { createServerError } = require('../utils/errorCreators');

const isValidProductId = async productId => {
  try {
    const product = await Product.findById({ _id: productId });

    return !!product;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const searchProductsByTitle = async searchQuery => {
  try {
    const title = new RegExp(searchQuery, 'gi');
    const products = await Product.find().or({ 'title.ua': { $regex: title } }, { 'title.ru': { $regex: title } });
    return products;
  } catch (err) {
    throw createServerError(err.message);
  }
}

const searchProductById = async prodId => {
  try {
    const product = await Product.findById(prodId);
    return product;
  } catch (err) {
    throw createServerError(err.message);
  }
}

module.exports = { isValidProductId, searchProductsByTitle, searchProductById };
