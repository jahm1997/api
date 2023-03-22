const Dogscapture = (dogs, name, data) => {
  // const addtoDB = dogs.bulkCreate(perrosApi);
  // const perrosApi = data.map((elemento) => {
  //   return {
  //     id: elemento.id,
  //     name: elemento.name,
  //     image: elemento.image.url,
  //     weight: elemento.weight.metric,
  //     height: elemento.height.metric,
  //     life_span: elemento.life_span,
  //     temperament: elemento.temperament,
  //   };
  // });
  const perrosDB = dogs.map((elemento) => {
    return {
      id: elemento.id,
      name: elemento.name,
      image: elemento.image,
      weight: elemento.weight.metric,
      height: elemento.height.metric,
      life_span: elemento.life_span,
      temperament: elemento.temperament,
    };
  });
  //transformación a array ?.split("-")
  if (name) {
    // const union = [...perrosApi, ...perrosDB];
    let raza = perrosDB.filter((perro) =>
      perro.name.toLowerCase().includes(name.toLowerCase())
    );
    return raza;
  } else {
    // const union = [...perrosApi, ...perrosDB];
    return perrosDB;
  }
};

module.exports = Dogscapture;
