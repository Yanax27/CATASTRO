const { Router } = require("express");
const predioRoutes = require("./predio.routes");
const authRoutes = require("./auth.routes");

const router = Router();

// Agrupación de rutas
router.use("/predios", predioRoutes);
router.use("/auth", authRoutes);

module.exports = router;