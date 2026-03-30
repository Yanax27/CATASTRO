import { toast } from "react-toastify";
import {
  searchPrediosApi,
  getPredioByReferenciaApi,
  updateUbicCarpetaApi,
  getDashboardResumenApi,
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
  updateUbicCarpetaStart,
  updateUbicCarpetaSuccess,
  updateUbicCarpetaFailure,
  clearUpdateUbicCarpetaState,
  getDashboardResumenStart,
  getDashboardResumenSuccess,
  getDashboardResumenFailure,
} from "./predioSlice";

// 📌 Buscar predios usando filtros del estado o filtros enviados manualmente
export const searchPredios =
  (customFilters = null) =>
  async (dispatch, getState) => {
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

// 📌 Actualizar ubicación de carpeta
export const updateUbicCarpeta =
  (referenciaCatastral, ubic_carpeta) => async (dispatch) => {
    dispatch(updateUbicCarpetaStart());

    try {
      const data = await updateUbicCarpetaApi(
        referenciaCatastral,
        ubic_carpeta
      );

      dispatch(updateUbicCarpetaSuccess(data));
      toast.success("Ubicación actualizada correctamente.");

      // Refrescar dashboard después de actualizar
      dispatch(getDashboardResumen());

      return { ok: true, data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Error al actualizar la ubicación de carpeta";

      dispatch(updateUbicCarpetaFailure(message));
      toast.error(message);

      return { ok: false, message };
    }
  };

// 📌 Obtener resumen del dashboard
export const getDashboardResumen = () => async (dispatch) => {
  dispatch(getDashboardResumenStart());

  try {
    const data = await getDashboardResumenApi();
    dispatch(getDashboardResumenSuccess(data));
    return { ok: true, data };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Error al obtener el resumen del dashboard";

    dispatch(getDashboardResumenFailure(message));
    return { ok: false, message };
  }
};

// 📌 Limpiar estado de actualización
export const resetUpdateUbicCarpetaState = () => (dispatch) => {
  dispatch(clearUpdateUbicCarpetaState());
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