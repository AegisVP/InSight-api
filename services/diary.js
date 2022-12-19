const { Diary } = require('../db/diary.model');
const { Product } = require('../db/product.model');
const { createServerError } = require('../utils/errorCreators');

const getDiary = async findParams => {
  try {
    const diary = await Diary.find(findParams).populate('product', '_id categories title calories weight');
    return diary;
  } catch (err) {
    throw createServerError("Can't read notes");
  }
};

const getDiaryById = async findParams => {
  try {
    const diary = await Diary.findById(findParams).populate('product', '_id categories title calories weight');
    return diary;
  } catch (err) {
    throw createServerError("Can't read notes");
  }
};

const createDiaryNote = async createParams => {
  try {
    const newNote = await Diary.create(createParams);
    return newNote;
  } catch (err) {
    throw createServerError("Can't read notes");
  }
};

const removeDiaryNotesById = async (id)=>{ 
  try {
    const deletedNote = await Diary.findOneAndRemove({id});
    return deletedNote;
  } catch (err) {
    throw createServerError("Can't read notes");
  }
}; 

module.exports = { getDiary, getDiaryById, createDiaryNote, removeDiaryNotesById, Product};
