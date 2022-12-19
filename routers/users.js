const express = require('express');
const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
} = require('../controllers/userController');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { loginValidation, signupValidation } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', signupValidation, tryCatchWrapper(signupController));

router.post('/login', loginValidation, tryCatchWrapper(loginController));

router.patch('/logout', authMiddleware, tryCatchWrapper(logoutController));

router.get('/current', authMiddleware, tryCatchWrapper(currentUserController));

module.exports = router;
