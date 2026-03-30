const authService = require("../services/auth.service");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await authService.login({ username, password });

    if (!result) {
      return res.status(401).json({
        ok: false,
        message: "Usuario o contraseña incorrectos",
      });
    }

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 8 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    return res.status(200).json({
      ok: true,
      message: "Usuario autenticado",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite:"lax",
      path: "/",
    });

    return res.status(200).json({
      ok: true,
      message: "Sesión cerrada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  me,
  logout,
};