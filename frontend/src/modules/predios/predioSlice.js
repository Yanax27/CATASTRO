import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_DASHBOARD_RESUMEN } from "./prediosApi";

const initialState = {
  predios: [],
  paginatedPredios: [],
  predioSeleccionado: null,

  loading: false,
  error: null,

  updateUbicCarpetaLoading: false,
  updateUbicCarpetaError: null,
  updateUbicCarpetaSuccess: false,

  dashboardResumen: EMPTY_DASHBOARD_RESUMEN,
  dashboardResumenLoading: false,
  dashboardResumenError: null,

  filters: {
    referencia_catastral: "",
    nombre_titular: "",
  },

  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
};

const predioSlice = createSlice({
  name: "predios",
  initialState,
  reducers: {
    // =========================
    // BÚSQUEDA
    // =========================
    searchPrediosStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    searchPrediosSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.predios = action.payload;
      state.totalItems = action.payload.length;
      state.currentPage = 1;
      state.paginatedPredios = action.payload.slice(0, state.itemsPerPage);
    },

    searchPrediosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.predios = [];
      state.paginatedPredios = [];
      state.totalItems = 0;
    },

    // =========================
    // FILTROS
    // =========================
    setPredioFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearPredioFilters: (state) => {
      state.filters = {
        referencia_catastral: "",
        nombre_titular: "",
      };
    },

    // =========================
    // PAGINACIÓN
    // =========================
    changePredioPage: (state, action) => {
      state.currentPage = action.payload;

      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;

      state.paginatedPredios = state.predios.slice(start, end);
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
      state.paginatedPredios = state.predios.slice(0, state.itemsPerPage);
    },

    // =========================
    // DETALLE
    // =========================
    getPredioDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getPredioDetailSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.predioSeleccionado = action.payload;
    },

    getPredioDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.predioSeleccionado = null;
    },

    clearPredioDetail: (state) => {
      state.predioSeleccionado = null;
    },

    // =========================
    // ACTUALIZAR UBICACIÓN
    // =========================
    updateUbicCarpetaStart: (state) => {
      state.updateUbicCarpetaLoading = true;
      state.updateUbicCarpetaError = null;
      state.updateUbicCarpetaSuccess = false;
    },

    updateUbicCarpetaSuccess: (state, action) => {
      state.updateUbicCarpetaLoading = false;
      state.updateUbicCarpetaError = null;
      state.updateUbicCarpetaSuccess = true;

      const updated = action.payload;

      state.predios = state.predios.map((item) =>
        item.referencia_catastral_antigua === updated.referencia_catastral_antigua
          ? {
              ...item,
              ubic_carpeta: updated.ubic_carpeta,
              fecha_rec_carpeta: updated.fecha_rec_carpeta,
            }
          : item
      );

      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      state.paginatedPredios = state.predios.slice(start, end);

      if (
        state.predioSeleccionado?.referencia_catastral_antigua ===
        updated.referencia_catastral_antigua
      ) {
        state.predioSeleccionado = {
          ...state.predioSeleccionado,
          ubic_carpeta: updated.ubic_carpeta,
          fecha_rec_carpeta: updated.fecha_rec_carpeta,
        };
      }

      // Actualización optimista del dashboard
      // Para evitar inconsistencias complejas, luego puedes refrescar dashboard.
    },

    updateUbicCarpetaFailure: (state, action) => {
      state.updateUbicCarpetaLoading = false;
      state.updateUbicCarpetaError = action.payload;
      state.updateUbicCarpetaSuccess = false;
    },

    clearUpdateUbicCarpetaState: (state) => {
      state.updateUbicCarpetaLoading = false;
      state.updateUbicCarpetaError = null;
      state.updateUbicCarpetaSuccess = false;
    },

    // =========================
    // DASHBOARD
    // =========================
    getDashboardResumenStart: (state) => {
      state.dashboardResumenLoading = true;
      state.dashboardResumenError = null;
    },

    getDashboardResumenSuccess: (state, action) => {
      state.dashboardResumenLoading = false;
      state.dashboardResumenError = null;
      state.dashboardResumen = action.payload || EMPTY_DASHBOARD_RESUMEN;
    },

    getDashboardResumenFailure: (state, action) => {
      state.dashboardResumenLoading = false;
      state.dashboardResumenError = action.payload;
      state.dashboardResumen = EMPTY_DASHBOARD_RESUMEN;
    },

    // =========================
    // RESET RESULTADOS
    // =========================
    clearPrediosResults: (state) => {
      state.predios = [];
      state.paginatedPredios = [];
      state.totalItems = 0;
      state.currentPage = 1;
      state.error = null;
    },
  },
});

export const {
  searchPrediosStart,
  searchPrediosSuccess,
  searchPrediosFailure,
  setPredioFilters,
  clearPredioFilters,
  changePredioPage,
  setItemsPerPage,
  getPredioDetailStart,
  getPredioDetailSuccess,
  getPredioDetailFailure,
  clearPredioDetail,
  updateUbicCarpetaStart,
  updateUbicCarpetaSuccess,
  updateUbicCarpetaFailure,
  clearUpdateUbicCarpetaState,
  getDashboardResumenStart,
  getDashboardResumenSuccess,
  getDashboardResumenFailure,
  clearPrediosResults,
} = predioSlice.actions;

export default predioSlice.reducer;