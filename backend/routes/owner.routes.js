const express = require("express");
const {
  register,
  login,
  getOwnerProfile,
  logout,
} = require("../controllers/owner.controller");
const { authOwner } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authOwner, getOwnerProfile);

router.get("/logout", logout);

module.exports = router;
