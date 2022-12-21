const createValidationError = err => {
  err.message = `Validation error: ${err.message}`;
  err.status = 400;
  return err;
};

const createAuthError = message => {
  const err = new Error();
  err.message = message || 'Not authorized';
  err.status = 401;
  return err;
};

const createNotFoundHttpError = message => {
  const err = new Error();
  err.message = message || 'Not found';
  err.status = 404;
  return err;
};

const createEmailExistError = message => {
  const err = new Error();
  err.message = message || 'User already exists';
  err.status = 409;
  return err;
};

const createServerError = message => {
  const err = new Error();
  err.message = message || 'Server error';
  err.status = 500;
  return err;
};

const createCustomError = (status, message) => {
  const err = new Error();
  err.message = message || 'Server error: Something went wrong...';
  err.status = status || 500;
  return err;
};

const signupError = message => {
  const err = new Error();
  err.message = message || 'Email is already used';
  err.status = 400;
  return err;
};

module.exports = {
  createValidationError,
  createAuthError,
  createNotFoundHttpError,
  createEmailExistError,
  createServerError,
  createCustomError,
  signupError,
};
