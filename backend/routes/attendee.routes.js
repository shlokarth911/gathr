const express = require("express");
const {
  register,
  login,
  getAttendeeProfile,
  logout,
  updateAttendeeProfile,
} = require("../controllers/attendee.controller");
const { authAttendee } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authAttendee, getAttendeeProfile);
router.put("/profile", authAttendee, updateAttendeeProfile);

router.get("/logout", authAttendee, logout);

module.exports = router;
