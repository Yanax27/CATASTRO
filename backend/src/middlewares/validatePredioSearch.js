const validatePredioSearch = (req, res, next) => {
  const { referencia_catastral, nombre_titular } = req.query;

  const hasAtLeastOneFilter =
    (referencia_catastral && referencia_catastral.trim()) ||
    (nombre_titular && nombre_titular.trim());

  if (!hasAtLeastOneFilter) {
    return res.status(400).json({
      ok: false,
      message:
        "Debe enviar al menos un parámetro de búsqueda: referencia_catastral o nombre_titular.",
    });
  }

  next();
};

module.exports = validatePredioSearch;