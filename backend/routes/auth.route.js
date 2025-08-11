const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);
router.post("/logout", logoutController);

module.exports = router;
