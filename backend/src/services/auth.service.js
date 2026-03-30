const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authUsers = require("../config/authUsers");

const findUserByUsername = (username) => {
  if (!username) return null;

  return (
    authUsers.find(
      (user) => user.username.toLowerCase() === username.trim().toLowerCase()
    ) || null
  );
};

const login = async ({ username, password }) => {
  const user = findUserByUsername(username);

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) return null;

  const payload = {
    username: user.username,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "10h",
  });

  return {
    token,
    user: payload,
  };
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  login,
  verifyToken,
};