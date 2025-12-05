const { Dog } = require("../db");

exports.getDogById = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscamos el perro en la base de datos por su ID
    // Usamos findAll para devolver un array, ya que el front espera un array (dog[0])
    const dog = await Dog.findAll({
      where: { id: id }
    });

    if (dog.length === 0) {
      return res.status(404).json({ message: "Dog not found" });
    }

    return res.status(200).json(dog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
};
