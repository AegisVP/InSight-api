const express = require('express');
const path = require('path');
const router = express.Router();
const { FRONTEND_LOCAL, FRONTEND_URL } = require('../config');

if (FRONTEND_LOCAL) {
  router.use(express.static(path.resolve('./public')));

  router.get('*', (_, res) => {
    return res.sendFile(path.resolve('./public/index.html'));
  });

} else {
  router.get((_, res) => {
    return res.redirect(FRONTEND_URL);
  });
}

module.exports = router;
