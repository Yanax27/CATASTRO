const express = require("express");
const cors = require("cors");
const routes = require("./routes");

async function createApp() {
  const app = express();

  // Middlewares base
  app.use(express.json());

  // Orígenes permitidos
  const allowedOrigins = [
    "http://localhost:5173", // frontend local
    "http://127.0.0.1:5173",
  ];

  // CORS
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Postman, Insomnia, etc.
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error("No permitido por CORS"));
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );

  // Headers extra
  app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, PUT, PATCH"
    );

    next();
  });

  // Salud
  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      message: "API activa",
    });
  });

  // Rutas principales
  app.use("/api", routes);

  // 404
  app.use((req, res) => {
    res.status(404).json({
      ok: false,
      message: "Ruta no encontrada",
    });
  });

  // Manejo de errores
  app.use((err, _req, res, _next) => {
    console.error("[ERR]", err);

    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      detail: err?.message,
    });
  });

  return app;
}

module.exports = { createApp };