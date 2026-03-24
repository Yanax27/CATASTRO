const predioDAO = require("../dao/predio.dao");

const searchPredios = async (filters) => {
  return await predioDAO.searchPredios(filters);
};

const getPredioByReferenciaCatastral = async (referenciaCatastral) => {
  return await predioDAO.getPredioByReferenciaCatastral(referenciaCatastral);
};

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastral,
};