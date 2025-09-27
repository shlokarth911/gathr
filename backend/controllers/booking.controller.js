const Booking = require("../models/Booking");
const { createBooking } = require("../services/booking.service");

module.exports.requestBooking = async (req, res) => {
  try {
    const { event, venue, date, time, numberOfGuests, totalCost } =
      req.body || {};

    if (!event || !venue || !date || !time || !numberOfGuests || !totalCost) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const attendeeId = req.attendee._id;

    const newBooking = await createBooking({
      event,
      attendee: attendeeId,
      venue,
      date,
      time,
      numberOfGuests,
      totalCost,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to request booking" });
  }
};

module.exports.acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    const ownerId = req.owner._id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.isConfirmed = true;

    await booking.save();

    res.status(200).json({ message: "Booking accepted", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept booking" });
  }
};

module.exports.rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    const ownerId = req.owner._id;
    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: "Booking rejected", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reject booking" });
  }
};
