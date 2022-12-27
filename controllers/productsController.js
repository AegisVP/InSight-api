const { searchProductsByTitle, searchProductById } = require('../services/products');
const { createNotFoundHttpError } = require('../utils/errorCreators');
const { createProdObj, createProdArrFromArr } = require('../utils/ProdListCreators');

const getProductsByTitle = async (req, res, next) => {
  const products = await searchProductsByTitle(req.query.title);

  if (!products.length) {
    return next(createNotFoundHttpError("Product not found"));
  }
  return res.status(200).json(createProdArrFromArr(products));
};

const getProductById = async (req, res, next) => {
  const { prodId } = req.params;
  const product = await searchProductById(prodId);

  if (!product) {
    return next(createNotFoundHttpError());
  }

  return res.status(200).json(createProdObj({ product, weight: product.weight }));
};

module.exports = { getProductsByTitle, getProductById };
