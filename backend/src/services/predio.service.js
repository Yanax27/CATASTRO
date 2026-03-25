const predioDAO = require("../dao/predio.dao");
const {
  mapPredioDomains,
  mapPrediosDomains,
} = require("../utils/mapPredioDomains");

const searchPredios = async (filters) => {
  const predios = await predioDAO.searchPredios(filters);
  return mapPrediosDomains(predios);
};

const getPredioByReferenciaCatastralAntigua = async (referenciaCatastral) => {
  const predio =
    await predioDAO.getPredioByReferenciaCatastralAntigua(referenciaCatastral);

  return mapPredioDomains(predio);
};

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastralAntigua,
};