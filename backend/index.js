require("dotenv").config();

const { createApp } = require("./src/app");
const { connectDB } = require("./src/config/db");

const { PORT = 4000 } = process.env;

async function start() {
  try {
    await connectDB();

    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error iniciando backend:", err);
  }
}

if (require.main === module) {
  start();
}