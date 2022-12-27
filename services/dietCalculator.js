const { getStopProduct } = require('./products');
const { createServerError } = require('../utils/errorCreators');

async function dietCalculator({ height, age, currentWeight, desireWeight, bloodType }) {
  try {
    const dailyIntake = Math.round(
      10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desireWeight)
    );
    const stopProd = await getStopProduct(bloodType);

    if (!dailyIntake && dailyIntake !== 0) {
      throw createServerError('Can`t calculate daily intake');
    }

    if (!stopProd.length) {
      throw createServerError('Can`t generate stop product list');
    }

    return { dailyIntake, stopProd };
  } catch (err) {
    throw createServerError(err.message);
  }
}

module.exports = { dietCalculator };

// "ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ДЛЯ ЖІНОК
// 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)"
