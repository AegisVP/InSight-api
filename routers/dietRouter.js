const router = require("express").Router();
const tryCatchWrapper = require("../utils/tryCatchWrapper");
// const { authMiddleware } = require("../middlewares/authMiddleware");
const { getDiet, getUserDiet } = require("../controllers/dietController");

// TODO add validation middleware
// TODO add authMiddleware middleware

router.get("/", tryCatchWrapper(getDiet));
router.get("/:user_id", tryCatchWrapper(getUserDiet));

module.exports = {dietRouter: router};
