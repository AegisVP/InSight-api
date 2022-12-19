const router = require("express").Router();
const tryCatchWrapper = require("../utils/tryCatchWrapper");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { diaryDateValidationMiddleware, diaryBodyValidationMiddleware } = require("../middlewares/diaryValidationMiddleware");
const { getDiaryByDay, addDiaryNote, deleteDiaryNoteByProdId } = require("../controllers/diaryController");

router.get("/:day", authMiddleware, diaryDateValidationMiddleware, tryCatchWrapper(getDiaryByDay));
router.post("/:day", authMiddleware, diaryDateValidationMiddleware, diaryBodyValidationMiddleware, tryCatchWrapper(addDiaryNote));
router.delete("/:day/:prodId", authMiddleware, diaryDateValidationMiddleware, tryCatchWrapper(deleteDiaryNoteByProdId));

module.exports = router;
