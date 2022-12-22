require('dotenv').config();
const { PORT } = require('./config');
const { app } = require('./app');
const { mongoConnect } = require('./db/connections');

async function start() {
  try {
    mongoConnect();

    app.listen(PORT  || 8080, () => {
      console.log(`Server running. Use our API on port: ${PORT || 8080}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

start();
