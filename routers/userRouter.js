const express = require('express');
const { signupController, loginController, logoutController } = require('../controllers/userController');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { loginValidation, signupValidation } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signupValidation, tryCatchWrapper(signupController));

router.post('/login', loginValidation, tryCatchWrapper(loginController));

router.post('/logout', authMiddleware, tryCatchWrapper(logoutController));

module.exports = router;
