const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const createToken = user => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    JWT_SECRET
  );

  return token;
};

module.exports = {
  createToken,
};
