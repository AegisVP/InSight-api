const createProdArr = ( diary ) => { 
  const prodArr = diary.map(
    
    
    createProdObj);
  return prodArr;
};

const createProdObj=({product, weight})=> {
const { _id, categories, weight: prodWeight, calories, title} = product
  const prodObj = {
    _id,
    categories,
    weight,
    calories: Math.round(weight*(calories/prodWeight)),
    title: {
      "ru": title.ru,
      "ua": title.ua
    },
  };

return prodObj;
};

module.exports = { createProdArr, createProdObj };