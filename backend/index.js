require("dotenv").config();

const { createApp } = require("./src/app");
const { connectDB } = require("./src/config/db");

const { PORT = 4000 } = process.env;

async function start() {
  try {
    await connectDB();

    const app = await createApp();

    // Ruta raíz simple
    app.get("/", (_req, res) => {
      res.status(200).send("<h1>Backend Catastral activo ✅</h1>");
    });

    app.listen(PORT, () => {
      console.log(`✅ Backend corriendo en http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error iniciando backend:", err);
  }
}

// Previene doble ejecución
if (require.main === module) {
  start();
}