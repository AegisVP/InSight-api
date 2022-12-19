const { createNotFoundHttpError } = require('../utils/errorCreators');
const { createProdArr, createProdObj } = require('../utils/ProdListCreators');
const { getDiary, getDiaryById, createDiaryNote, removeDiaryNotesById } = require('../services/diary');

const getDiaryByDay = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;

  const diaryByDay = await getDiary({owner: _id, date: day})

  if (diaryByDay.length === 0) {
    return next(createNotFoundHttpError("Notes not found"));
  }

  return res.status(200).json(createProdArr(diaryByDay));
};

const addDiaryNote = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;
  const { id: product, weight} = req.body;

  const newNote = await createDiaryNote({ owner: _id, date: day, product, weight });
  const newDiaryNote = await getDiaryById(newNote._id);

  return res.status(201).json(createProdObj(newDiaryNote));
 };

const deleteDiaryNoteByProdId = async (req, res, next) => {
  const { _id } = req.user;
  const { day, prodId } = req.params;
  
  const diaryByDay = await getDiary({owner: _id, date: day, product: prodId})
  
  if (diaryByDay.length === 0) {
   return next(createNotFoundHttpError("Notes not found"));
  }

  const diaryNote = diaryByDay.map(async ({_id}) => await removeDiaryNotesById(_id));

  if (diaryNote) {
    return res.status(200).json(createProdArr(diaryByDay));
  }

  return next(createNotFoundHttpError("Product not found"));
 };

module.exports = {
  getDiaryByDay,
  addDiaryNote, 
  deleteDiaryNoteByProdId
};
