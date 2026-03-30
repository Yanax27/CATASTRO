import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_API || "http:/localhost/",
  withCredentials: true, // 🔥 CLAVE PARA COOKIES
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use(
  (config) => {
    // 🔹 Aquí podrías agregar headers adicionales si luego usas tokens híbridos
    return config;
  },
  (error) => {
    console.error("❌ Error en request:", error);
    return Promise.reject(error);
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error.message || "Error desconocido";

    console.error("❌ Error en API:", {
      status,
      message,
      url: error?.config?.url,
    });

    // 🔥 Manejo automático de sesión expirada
    if (status === 401) {
      console.warn("⚠️ Sesión no válida o expirada");

      // 👉 OPCIONAL (futuro):
      // aquí podrías limpiar Redux automáticamente
      // o redirigir al login
      //
      // ejemplo:
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;