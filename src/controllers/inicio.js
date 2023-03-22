const { Dog } = require("../db");

const inicio = (dataApi) => {
  const perrosApi = dataApi.map((elemento) => {
    return {
      id: elemento.id,
      name: elemento.name,
      image: elemento.image.url,
      weight: elemento.weight.metric,
      height: elemento.height.metric,
      life_span: elemento.life_span,
      temperament: elemento.temperament,
    };
  });
  Dog.bulkCreate(perrosApi.map((t) => t));
};

module.exports = inicio;
