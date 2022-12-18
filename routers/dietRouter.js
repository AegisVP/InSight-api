const router = require("express").Router();
const tryCatchWrapper = require("../utils/tryCatchWrapper");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const { dietValidationMiddleware } = require("../middlewares/dietValidationMiddleware");
const { getDiet, getUserDiet } = require("../controllers/dietController");

// TODO add authMiddleware middleware

router.get("/", dietValidationMiddleware, tryCatchWrapper(getDiet));
router.get("/:user_id", dietValidationMiddleware, tryCatchWrapper(getUserDiet));

module.exports = {dietRouter: router};
