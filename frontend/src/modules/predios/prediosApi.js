import api from "../../api/axios";

const API_URL = "/api/predios";

// 📌 Buscar predios por filtros
export const searchPrediosApi = async (filters = {}) => {
  try {
    const cleanFilters = {
      referencia_catastral: filters.referencia_catastral?.trim() || "",
      nombre_titular: filters.nombre_titular?.trim() || "",
    };

    const response = await api.get(`${API_URL}/buscar`, {
      params: cleanFilters,
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error al buscar predios:", error);
    throw error;
  }
};

// 📌 Obtener detalle por referencia catastral antigua
export const getPredioByReferenciaApi = async (referenciaCatastral) => {
  try {
    const response = await api.get(
      `${API_URL}/detalle/${encodeURIComponent(referenciaCatastral)}`
    );

    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Error al obtener detalle del predio:", error);
    throw error;
  }
};