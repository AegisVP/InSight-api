const router = require("express").Router();
const tryCatchWrapper = require("../utils/tryCatchWrapper");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const { diaryDateValidationMiddleware, diaryBodyValidationMiddleware } = require("../middlewares/diaryValidationMiddleware");
const { getDiaryByDay, addDiaryNote, deleteDiaryNoteByProdId } = require("../controllers/diaryController");

// TODO add authMiddleware middleware

router.get("/:day", diaryDateValidationMiddleware, tryCatchWrapper(getDiaryByDay));
router.post("/:day", diaryDateValidationMiddleware, diaryBodyValidationMiddleware, tryCatchWrapper(addDiaryNote));
router.delete("/:day/:prodId", diaryDateValidationMiddleware, tryCatchWrapper(deleteDiaryNoteByProdId));

module.exports = {diaryRouter: router};
