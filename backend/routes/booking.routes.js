const express = require("express");
const {
  requestBooking,
  acceptBooking,
  rejectBooking,
  listBookingsForAttendee,
  listBookingsForOwner,
} = require("../controllers/booking.controller");
const { authAttendee, authOwner } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/request", authAttendee, requestBooking);
router.post("/accept/:id", authOwner, acceptBooking);
router.post("/reject/:id", authOwner, rejectBooking);

router.get("/list_atendee", authAttendee, listBookingsForAttendee);
router.get("/list_owner", authOwner, listBookingsForOwner);

module.exports = router;
