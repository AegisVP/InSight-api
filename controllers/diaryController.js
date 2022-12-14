const { createNotFoundHttpError } = require('../utils/errorCreators');
const { createProdArrFromDiary, createProdObj } = require('../utils/ProdListCreators');
const { isValidProductId } = require('../services/products');
const { getDiary, createDiaryNote, removeDiaryNoteById, updateDiaryNote } = require('../services/diary');

const getDiaryByDay = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;

  const diaryByDay = await getDiary({ owner: _id, date: day });

  if (diaryByDay.length === 0) {
    return next(createNotFoundHttpError('Notes not found'));
  }

  return res.status(200).json(createProdArrFromDiary(diaryByDay));
};

const addDiaryNote = async (req, res, next) => {
  const { _id } = req.user;
  const { day } = req.params;
  const { id: productId, weight } = req.body;

  if (!(await isValidProductId(productId))) {
    return next(createNotFoundHttpError('Product not found'));
  }

  const [diaryNote] = await getDiary({ owner: _id, date: day, product: productId });

  if (!diaryNote) {
    const newNote = await createDiaryNote({ owner: _id, date: day, product: productId, weight });
    const [newDiaryNote] = await getDiary({ _id: newNote._id });
    return res.status(201).json(createProdObj(newDiaryNote));
  }

  const newNote = await updateDiaryNote(diaryNote._id, { weight: parseInt(diaryNote.weight) + parseInt(weight) });
  return res.status(200).json(createProdObj(newNote));
};

const deleteDiaryNoteByProdId = async (req, res, next) => {
  const { _id } = req.user;
  const { day, prodId } = req.params;

  const [diaryByDay] = await getDiary({ owner: _id, date: day, product: prodId });

  if (!diaryByDay) {
    return next(createNotFoundHttpError('Notes not found'));
  }

  const diaryNote = await removeDiaryNoteById(diaryByDay._id);
  if (diaryNote) {
    return res.status(200).json(createProdObj({ product: diaryByDay.product, weight: diaryByDay.weight }));
  }

  return next(createNotFoundHttpError('Product not found'));
};

module.exports = {
  getDiaryByDay,
  addDiaryNote,
  deleteDiaryNoteByProdId,
};
