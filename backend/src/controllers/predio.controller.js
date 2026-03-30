const predioService = require("../services/predio.service");

const searchPredios = async (req, res, next) => {
  try {
    const filters = req.query;
    const data = await predioService.searchPredios(filters);

    res.status(200).json({
      ok: true,
      message: "Predios obtenidos correctamente",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPredioByReferenciaCatastralAntigua = async (req, res, next) => {
  try {
    const { referenciaCatastral } = req.params;

    const data =
      await predioService.getPredioByReferenciaCatastralAntigua(
        referenciaCatastral
      );

    if (!data) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el predio solicitado",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Detalle del predio obtenido correctamente",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateUbicCarpeta = async (req, res, next) => {
  try {
    const { referenciaCatastral } = req.params;
    const { ubic_carpeta } = req.body;

    const data =
      await predioService.updateUbicCarpetaByReferenciaCatastralAntigua(
        referenciaCatastral,
        ubic_carpeta
      );

    if (!data) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el predio para actualizar",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Ubicación de carpeta actualizada correctamente",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboardResumen = async (req, res, next) => {
  try {
    const data = await predioService.getDashboardResumen();

    res.status(200).json({
      ok: true,
      message: "Resumen del dashboard obtenido correctamente",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastralAntigua,
  updateUbicCarpeta,
  getDashboardResumen,
};