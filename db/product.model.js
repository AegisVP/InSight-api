const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categories: {
    type: [String],
    required: [true, 'Categories are required'],
  },
  weight: {
    type: Number,
    default: 100,
  },
  title: mongoose.Schema({
    ru: { type: String },
    ua: { type: String },
  }),
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: [true, 'GroupBloodNotAllowed are required'],
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = { Product };
