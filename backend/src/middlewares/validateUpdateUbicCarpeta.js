const ubicacionesPermitidas = [
  "Ventanilla",
  "Geomatica",
  "Unidad Campo",
  "Secretaria",
  "Asesoria Legal",
  "Archivos",
  "Otros",
];

const validateUpdateUbicCarpeta = (req, res, next) => {
  const { ubic_carpeta } = req.body;

  if (!ubic_carpeta || !ubic_carpeta.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El campo ubic_carpeta es obligatorio.",
    });
  }

  const input = ubic_carpeta.trim().toLowerCase();

  const match = ubicacionesPermitidas.find(
    (u) => u.toLowerCase() === input
  );

  if (!match) {
    return res.status(400).json({
      ok: false,
      message: `Ubicación inválida. Valores permitidos: ${ubicacionesPermitidas.join(", ")}`,
    });
  }

  // guardamos el valor correcto (con formato oficial)
  req.body.ubic_carpeta = match;

  next();
};

module.exports = validateUpdateUbicCarpeta;