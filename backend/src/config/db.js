const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate:
      process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
  pool: {
    max: Number(process.env.DB_POOL_MAX) || 10,
    min: Number(process.env.DB_POOL_MIN) || 0,
    idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT) || 30000,
  },
};

let pool = null;

const connectDB = async () => {
  try {
    if (pool) return pool;

    pool = await sql.connect(dbConfig);
    console.log("✅ Conexión exitosa a SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Error al conectar con SQL Server:", error.message);
    throw error;
  }
};

const getPool = async () => {
  if (pool) return pool;
  return await connectDB();
};

module.exports = {
  sql,
  dbConfig,
  connectDB,
  getPool,
};