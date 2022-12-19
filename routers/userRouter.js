const express = require('express');
const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
} = require('../controllers/userController');
const { googleAuth, googleRedirect } = require('../controllers/authGoogleController');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { loginValidation, signupValidation } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', signupValidation, tryCatchWrapper(signupController));

router.post('/login', loginValidation, tryCatchWrapper(loginController));

router.patch('/logout', authMiddleware, tryCatchWrapper(logoutController));

router.get('/current', authMiddleware, tryCatchWrapper(currentUserController));

router.get('/google', tryCatchWrapper(googleAuth));

router.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = router;
