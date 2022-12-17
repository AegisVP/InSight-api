const express = require('express');
const { signupController, loginController } = require('../controllers/userController');
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { loginValidation } = require('../middlewares/validationLoginMiddlewate');

const router = express.Router();

router.post('/signup', loginValidation, tryCatchWrapper(signupController));

router.post('/login', loginValidation, tryCatchWrapper(loginController));

module.exports = router;
