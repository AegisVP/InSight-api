const router = require('express').Router();
const tryCatchWrapper = require('../utils/tryCatchWrapper');
const { googleAuth, googleRedirect } = require('../controllers/authController');

router.get('/google', tryCatchWrapper(googleAuth));
router.get('/google-redirect', tryCatchWrapper(googleRedirect));

module.exports = router;
