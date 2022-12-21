const router = require('express').Router();
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { dietValidationMiddleware } = require('../middlewares/dietValidationMiddleware');
const { getDiet, getUserDiet } = require('../controllers/dietController');

router.post('/', dietValidationMiddleware, tryCatchWrapper(getDiet));
router.post('/user', authMiddleware, dietValidationMiddleware, tryCatchWrapper(getUserDiet));

module.exports = router;
