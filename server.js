require('dotenv').config();
const { PORT, BACKEND_URL } = require('./config');
const { app } = require('./app');
const { mongoConnect } = require('./db/connections');

async function start() {
  try {
    mongoConnect();

    app.listen(PORT, () => {
      console.log(`Server started successfully. You can use our API at ${BACKEND_URL}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

start();
