const { Router } = require("express");
const predioController = require("../controllers/predio.controller");
const validatePredioSearch = require("../middlewares/validatePredioSearch");

const router = Router();

router.get("/buscar", validatePredioSearch, predioController.searchPredios);

router.get(
  "/detalle/:referenciaCatastral",
  predioController.getPredioByReferenciaCatastral
);

module.exports = router;