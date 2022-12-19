const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.resolve('./public')));

router.get('*', (_, res) => {
  return res.sendFile(path.resolve('./public/index.html'));
});

module.exports = router;
