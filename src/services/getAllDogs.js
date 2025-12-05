const { Dog } = require("../db");
const { Op } = require("sequelize");

exports.todos = async (req, res) => {
  const { name, limit } = req.query;

  try {
    let dogs;
    if (name) {
      dogs = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
    } else {
      dogs = await Dog.findAll();
    }

    if (limit) {
      return res.status(200).send(dogs.slice(0, Number(limit)));
    }
    
    return res.status(200).send(dogs);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
};
