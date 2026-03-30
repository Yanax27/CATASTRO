import api from "../../api/axios";

const API_URL = "/predios"; //listo para despliegue configurado para despliegue a servidor

export const UBICACIONES_CARPETA = [
  "Ventanilla",
  "Geomatica",
  "Unidad Campo",
  "Secretaria",
  "Asesoria Legal",
  "Archivos",
  "Otros",
];

// 📌 Estado inicial del resumen del dashboard
export const EMPTY_DASHBOARD_RESUMEN = {
  totalPredios: 0,
  sinUbicacion: 0,
  actualizadosHoy: 0,
  actualizadosUltimos7Dias: 0,
  ubicaciones: {
    Ventanilla: 0,
    Geomatica: 0,
    "Unidad Campo": 0,
    Secretaria: 0,
    "Asesoria Legal": 0,
    Archivos: 0,
    Otros: 0,
  },
};

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

// 📌 Actualizar ubicación de carpeta
export const updateUbicCarpetaApi = async (
  referenciaCatastral,
  ubic_carpeta
) => {
  try {
    const response = await api.patch(
      `${API_URL}/ubic-carpeta/${encodeURIComponent(referenciaCatastral)}`,
      { ubic_carpeta }
    );

    return response.data?.data || null;
  } catch (error) {
    console.error("❌ Error al actualizar ubicación de carpeta:", error);
    throw error;
  }
};

// 📌 Obtener resumen del dashboard
export const getDashboardResumenApi = async () => {
  try {
    const response = await api.get(`${API_URL}/dashboard-resumen`);
    return response.data?.data || EMPTY_DASHBOARD_RESUMEN;
  } catch (error) {
    console.error("❌ Error al obtener resumen del dashboard:", error);
    throw error;
  }
};