const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const {
  createHold,
  confirmBooking,
} = require("../controllers/booking.controller");

router.post("/hold", requireAuth, createHold);

router.post("/:id/confirm", requireAuth, confirmBooking);

module.exports = router;
