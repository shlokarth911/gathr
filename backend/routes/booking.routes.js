const express = require("express");
const {
  requestBooking,
  acceptBooking,
} = require("../controllers/booking.controller");
const router = express.Router();

router.post("/request", requestBooking);
router.post("/accept/:id", acceptBooking);

module.exports = router;
