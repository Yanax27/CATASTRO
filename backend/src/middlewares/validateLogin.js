const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El campo username es obligatorio.",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El campo password es obligatorio.",
    });
  }

  next();
};

module.exports = validateLogin;