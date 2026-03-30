const authUsers = [
  {
    username: process.env.AUTH_ADMIN_USERNAME,
    name: process.env.AUTH_ADMIN_NAME || "Administrador",
    role: process.env.AUTH_ADMIN_ROLE || "admin",
    passwordHash: process.env.AUTH_ADMIN_PASSWORD_HASH,
  },
  {
    username: process.env.AUTH_USER_USERNAME,
    name: process.env.AUTH_USER_NAME || "Consulta",
    role: process.env.AUTH_USER_ROLE || "user",
    passwordHash: process.env.AUTH_USER_PASSWORD_HASH,
  },
].filter((user) => user.username && user.passwordHash);

module.exports = authUsers;