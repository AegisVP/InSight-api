const router = require('express').Router();
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { productsValidationMiddleware } = require('../middlewares/productsValidationMiddleware');
const { getProductsByTitle, getProductById } = require('../controllers/productsController');

router.get('/', authMiddleware, productsValidationMiddleware, tryCatchWrapper(getProductsByTitle));
router.get('/:prodId', authMiddleware, tryCatchWrapper(getProductById));

module.exports = router;
