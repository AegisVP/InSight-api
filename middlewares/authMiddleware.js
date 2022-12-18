const jwt = require('jsonwebtoken');

const { User } = require('../db/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.header['authorization'].split(' ');

    if (!token || tokenType !== 'Bearer') {
      // TODO ERROR
      next(new Error('Not autorized'));
    }

    const { id } = jwt.decode(token, poccess.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || token !== user.token) {
      // TODO ERROR
      next(new Error('Not autorized'));
    }

    req.token = token;
    req.user = userж;

    next();
  } catch (err) {
    next(new Error('Not autorized'));
  }
};

module.exports = {
  authMiddleware,
};
