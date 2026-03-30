const authService = require("../services/auth.service");

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado. Sesión no encontrada.",
      });
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "No autorizado. Token inválido o expirado.",
    });
  }
};

module.exports = authenticate;