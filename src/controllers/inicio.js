const { Dog } = require("../db");

const inicio = (dataApi) => {
  Dog.bulkCreate(dataApi.map((t) => t));
};

module.exports = inicio;
