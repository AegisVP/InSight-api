const express = require('express');
const path = require('path');
const router = express.Router();
const { FRONTEND_LOCAL, FRONTEND_URL } = require('../config');

console.log({ FRONTEND_LOCAL });

router.get('*', (_, res) => {
  if (FRONTEND_LOCAL) return res.sendFile(path.resolve('./public/index.html'));

  return res.redirect(FRONTEND_URL);
});

module.exports = router;
