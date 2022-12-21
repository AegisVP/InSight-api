const createProdArrFromDiary = diary => {
  const prodArr = diary.map(createProdObj);
  return prodArr;
};

const createProdArrFromArr = arr => {
  const prodArr = arr.map(product => createProdObj({ product, weight: product.weight }));
  return prodArr;
};

const createProdObj = ({ product, weight }) => {
  const { _id, categories, weight: prodWeight, calories, title } = product;
  weight = weight ?? prodWeight;

  const prodObj = {
    _id,
    categories,
    weight,
    calories: Math.round(weight * (calories / prodWeight)),
    title: {
      ua: title.ua,
      ru: title.ru,
    },
  };

  return prodObj;
};

module.exports = { createProdArrFromDiary, createProdArrFromArr, createProdObj };
