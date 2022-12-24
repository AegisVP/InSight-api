require('dotenv').config();

module.exports = {
  DB_PATH: process.env.DB_PATH,
  PORT: process.env.PORT || 8088,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_FRONTEND_HANDLER: process.env.GOOGLE_FRONTEND_HANDLER,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT Secret Message',
  FRONTEND_LOCAL: String(process.env.FRONTEND_LOCAL).toLocaleLowerCase() === 'false',
};
