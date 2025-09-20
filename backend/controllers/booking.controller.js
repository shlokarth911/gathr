const Booking = require("../models/Booking");

module.exports.requestBooking = async (req, res) => {
  try {
    const { event, venue, date, time, numberOfGuests, totalCost } =
      req.body || {};

    if (!event || !venue || !date || !time || !numberOfGuests || !totalCost) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const attendeeId = req.attendee?.[_id];
    if (!attendeeId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newBooking = new booking({
      event,
      attendee: attendeeId,
      venue,
      date,
      time,
      numberOfGuests,
      totalCost,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to request booking" });
  }
};

module.exports.acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

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
