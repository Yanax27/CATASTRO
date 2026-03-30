const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth.middleware");
const validateLogin = require("../middlewares/validateLogin");

const router = Router();

router.post("/login", validateLogin, authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.me);

module.exports = router;