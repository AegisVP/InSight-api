require('dotenv').config();

module.exports = {
  DB_PATH: process.env.DB_PATH,
  PORT: process.env.PORT || 8088,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  GOOGLE_FRONTEND_HANDLER: process.env.GOOGLE_FRONTEND_HANDLER,
  JWT_SECRET: process.env.JWT_SECRET,
};
