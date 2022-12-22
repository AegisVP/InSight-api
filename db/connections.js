const mongoose = require('mongoose');
const { DB_PATH } = require('../config');
const productsConst = require('./productsConst')

const mongoConnect = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await productsConst.fullUpdate();
    console.log('Database connection successful');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  mongoConnect,
};
