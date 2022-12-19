const { createNotFoundHttpError } = require('../utils/errorCreators');
const { Diary } = require('../db/diary.model');

const getDiaryByDay = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;

  const diaryByDay = await Diary.find({owner: _id, date: day}).populate(
    "product",
    "_id categories title calories"
  );

  if (diaryByDay) {
    return res.status(200).json(diaryByDay);
  }

  return next(createNotFoundHttpError("Diary not found"));
};

const addDiaryNote = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;
  const { id: product, weight} = req.body;

  const newDiaryNote = await Diary.create({ owner: _id, date: day, product, weight }).populate(
    "product",
    "_id categories title calories"
  );

  return res.status(201).json(newDiaryNote);
 };

const deleteDiaryNoteByProdId = async (req, res, next) => {
  const { _id } = req.user;
  const { day, prodId } = req.params;

  const diaryNote = await Diary.findOneAndRemove({owner: _id, date: day, product: prodId}).populate(
    "product",
    "_id categories title calories"
  );

  if (diaryNote) {
    return res.status(200).json(diaryNote);
  }

  return next(createNotFoundHttpError("Product not found"));
 };

module.exports = {
  getDiaryByDay,
  addDiaryNote, 
  deleteDiaryNoteByProdId
};
