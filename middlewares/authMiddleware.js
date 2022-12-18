const jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { createAuthError } = require('../utils/errorCreators');

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(' ');

    if (!token || tokenType !== 'Bearer') {
      next(createAuthError());
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);

    const auditUser = await User.findById(user._id);

    if (!auditUser || token !== auditUser.token) {
      next(createAuthError());
    }

    if (token !== auditUser.token) {
      await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
      next(createAuthError());
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    next(createAuthError());
  }
};

module.exports = {
  authMiddleware,
};
