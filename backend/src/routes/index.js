const { Router } = require("express");
const predioRoutes = require("./predio.routes");

const router = Router();

// Agrupación de rutas
router.use("/predios", predioRoutes);

module.exports = router;