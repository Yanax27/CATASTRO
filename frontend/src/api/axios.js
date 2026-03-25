import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "❌ Error en petición API:",
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;