const validatePredioSearch = (req, res, next) => {
  const {
    zona,
    distrito,
    manzano,
    predio,
    referencia_catastral,
    tuc_id,
    tuu_id,
    tep_id,
    cep_id,
    tipo_documento,
  } = req.query;

  const hasAtLeastOneFilter =
    zona ||
    distrito ||
    manzano ||
    predio ||
    referencia_catastral ||
    tuc_id ||
    tuu_id ||
    tep_id ||
    cep_id ||
    tipo_documento;

  if (!hasAtLeastOneFilter) {
    return res.status(400).json({
      ok: false,
      message:
        "Debe enviar al menos un parámetro de búsqueda válido.",
    });
  }

  next();
};

module.exports = validatePredioSearch;