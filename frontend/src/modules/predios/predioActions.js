import {
  searchPrediosApi,
  getPredioByReferenciaApi,
} from "./prediosApi";

import {
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
} from "./predioSlice";

// 📌 Buscar predios usando filtros del estado o filtros enviados manualmente
export const searchPredios = (customFilters = null) => async (dispatch, getState) => {
  dispatch(searchPrediosStart());

  try {
    const stateFilters = getState().predios.filters;
    const filtersToUse = customFilters || stateFilters;

    const data = await searchPrediosApi(filtersToUse);
    dispatch(searchPrediosSuccess(data));
  } catch (error) {
    dispatch(
      searchPrediosFailure(
        error?.response?.data?.message ||
          error.message ||
          "Error al buscar predios"
      )
    );
  }
};

// 📌 Actualizar filtros
export const updatePredioFilters = (filters) => (dispatch) => {
  dispatch(setPredioFilters(filters));
};

// 📌 Limpiar filtros
export const resetPredioFilters = () => (dispatch) => {
  dispatch(clearPredioFilters());
};

// 📌 Limpiar resultados
export const resetPrediosResults = () => (dispatch) => {
  dispatch(clearPrediosResults());
};

// 📌 Cambiar página
export const setPredioPage = (page) => (dispatch) => {
  dispatch(changePredioPage(page));
};

// 📌 Cambiar items por página
export const updateItemsPerPage = (items) => (dispatch) => {
  dispatch(setItemsPerPage(items));
};

// 📌 Obtener detalle del predio por referencia catastral
export const getPredioDetail = (referenciaCatastral) => async (dispatch) => {
  dispatch(getPredioDetailStart());

  try {
    const predio = await getPredioByReferenciaApi(referenciaCatastral);
    dispatch(getPredioDetailSuccess(predio));
  } catch (error) {
    dispatch(
      getPredioDetailFailure(
        error?.response?.data?.message ||
          error.message ||
          "Error al obtener el detalle del predio"
      )
    );
  }
};

// 📌 Limpiar detalle
export const resetPredioDetail = () => (dispatch) => {
  dispatch(clearPredioDetail());
};

// 📌 Buscar directamente con filtros nuevos
export const searchPrediosWithFilters = (filters) => async (dispatch) => {
  dispatch(setPredioFilters(filters));
  dispatch(searchPredios(filters));
};