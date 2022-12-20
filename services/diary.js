const { Diary } = require('../db/diary.model');
const { Product } = require('../db/product.model');
const { createServerError } = require('../utils/errorCreators');

const getDiary = async findParams => {
  try {
    const diary = await Diary.find(findParams).populate('product', '_id categories title calories weight');
    return diary;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const createDiaryNote = async createParams => {
  try {
    const newNote = await Diary.create(createParams);
    return newNote;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const updateDiaryNote = async (_id, value) => {
  try {
    const updatedtedNote = await Diary.findOneAndUpdate({ _id }, { ...value }, { new: true }).populate('product', '_id categories title calories weight');
    return updatedtedNote;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const removeDiaryNoteById = async _id => {
  try {
    const deletedNote = await Diary.findOneAndRemove({ _id });
    return deletedNote;
  } catch (err) {
    throw createServerError(err.message);
  }
};

const isValidProductId= async (productId) => {
  try {
    const product = await Product.findById({_id: productId});
    
    return !!product;
  } catch (err) {
    throw createServerError(err.message);
  }
};

module.exports = { getDiary, createDiaryNote, removeDiaryNoteById, updateDiaryNote, isValidProductId, Product };
