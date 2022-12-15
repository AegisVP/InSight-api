const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  mongoConnect,
};
