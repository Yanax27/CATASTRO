const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

async function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  const allowedOrigins = [
    "http://localhost:5173",
    "http://172.16.160.180",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("No permitido por CORS"));
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    })
  );

  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.status(200).send("<h1>Backend Catastral activo ✅</h1>");
  });

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      message: "API activa",
    });
  });

  app.use("/api", routes);

  app.use((req, res) => {
    res.status(404).json({
      ok: false,
      message: "Ruta no encontrada",
    });
  });

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