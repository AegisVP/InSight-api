const express = require('express');
const { signupController, loginController, logoutController } = require('../controllers/userController');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { loginValidation } = require('../middlewares/validationLoginMiddlewate');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', loginValidation, tryCatchWrapper(signupController));

router.post('/login', loginValidation, tryCatchWrapper(loginController));

router.post('/logout', authMiddleware, tryCatchWrapper(logoutController));

module.exports = router;
