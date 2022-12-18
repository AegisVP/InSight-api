const router = require('express').Router();
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { googleAuth, googleRedirect } = require('./authController');

router.get('/google', tryCatchWrapper(googleAuth));
router.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = router;
