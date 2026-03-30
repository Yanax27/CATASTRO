import api from "../../api/axios";

const API_URL = "/auth";//listo para despliegue configurado para despliegue a servidor

// 📌 Login
export const loginApi = async (credentials) => {
  try {
    const response = await api.post(`${API_URL}/login`, {
      username: credentials.username?.trim() || "",
      password: credentials.password || "",
    });

    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Error en login:", error);
    throw error;
  }
};

// 📌 Obtener usuario autenticado desde cookie
export const getMeApi = async () => {
  try {
    const response = await api.get(`${API_URL}/me`);
    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Error al obtener usuario autenticado:", error);
    throw error;
  }
};

// 📌 Logout
export const logoutApi = async () => {
  try {
    const response = await api.post(`${API_URL}/logout`);
    return response.data || null;
  } catch (error) {
    console.error("❌ Error en logout:", error);
    throw error;
  }
};