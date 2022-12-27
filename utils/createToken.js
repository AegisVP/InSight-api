const jwt = require('jsonwebtoken');

const createToken = user => {
  const token = jwt.sign(
    {
      _id: user._id,
      type: 'access',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2m',
    }
  );
  return token;
};

const createRefreshToken = user => {
  const token = jwt.sign(
    {
      _id: user._id,
      type: 'refresh',
    },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports = {
  createToken,
  createRefreshToken,
};
