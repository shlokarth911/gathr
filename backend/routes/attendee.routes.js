const express = require("express");
const {
  register,
  login,
  getAttendeeProfile,
} = require("../controllers/attendee.controller");
const { authAttendee } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authAttendee, getAttendeeProfile);

module.exports = router;
