const express = require("express");
const {
  requestBooking,
  acceptBooking,
  rejectBooking,
} = require("../controllers/booking.controller");
const { authAttendee, authOwner } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/request", authAttendee, requestBooking);
router.post("/accept/:id", authOwner, acceptBooking);
router.post("/reject/:id", authOwner, rejectBooking);

module.exports = router;
