const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Owner id is required'],
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: [true, 'Product id is required'],
  },
  weight: {
    type: Number,
    required: [true, 'Weight of eaten Product is required'],
  }
});

const Diary = mongoose.model('diary', diarySchema);

module.exports = { Diary };