const createProdArr = ( diary ) => { 
  const prodArr = diary.map(
    
    
    createProdObj);
  return prodArr;
};

const createProdObj=({product: { _id, categories, weight: prodWeight, calories, title}, weight})=> {
  const prodObj = {
    _id,
    categories,
    weight,
    calories: (weight*(calories/prodWeight)),
    title: {
      "ru": title.ru,
      "ua": title.ua
    },
  };

return prodObj;
};

module.exports = { createProdArr, createProdObj };