const { Router } = require("express");
const predioController = require("../controllers/predio.controller");
const validatePredioSearch = require("../middlewares/validatePredioSearch");
const validateUpdateUbicCarpeta = require("../middlewares/validateUpdateUbicCarpeta");
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = Router();

router.get(
  "/buscar",
  authenticate,
  authorizeRoles("admin", "user"),
  validatePredioSearch,
  predioController.searchPredios
);

router.get(
  "/detalle/:referenciaCatastral",
  authenticate,
  authorizeRoles("admin", "user"),
  predioController.getPredioByReferenciaCatastralAntigua
);

router.patch(
  "/ubic-carpeta/:referenciaCatastral",
  authenticate,
  authorizeRoles("admin"),
  validateUpdateUbicCarpeta,
  predioController.updateUbicCarpeta
);

router.get(
  "/dashboard-resumen",
  authenticate,
  authorizeRoles("admin", "user"),
  predioController.getDashboardResumen
);

module.exports = router;