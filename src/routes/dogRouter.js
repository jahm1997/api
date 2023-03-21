const { Router } = require("express");
const postDog = require("../services/postDog");
const getAllDogs = require("../services/getAllDogs");
const getDogById = require("../services/getDogId");

const router = Router();

//aqui van los CRUD del enlace registro
router.get("/", getAllDogs.todos);

router.get("/:id", getDogById.getDogById);

router.post("/add", postDog.sumar);

module.exports = router;
