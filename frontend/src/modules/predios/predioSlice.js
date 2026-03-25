import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  predios: [],
  paginatedPredios: [],
  predioSeleccionado: null,
  loading: false,
  error: null,

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
  clearPrediosResults,
} = predioSlice.actions;

export default predioSlice.reducer;