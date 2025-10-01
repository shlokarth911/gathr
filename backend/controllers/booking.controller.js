const Booking = require("../models/Booking");
const Owner = require("../models/Owner");
const Venue = require("../models/Venue");
const Attendee = require("../models/Attendee");
const { createBooking } = require("../services/booking.service");

module.exports.requestBooking = async (req, res) => {
  try {
    const { event, venue, date, time, numberOfGuests } = req.body || {};

    if (!event || !venue || !date || !time || !numberOfGuests) {
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
    });

    await Attendee.findByIdAndUpdate(attendeeId, {
      $push: { bookings: newBooking._id },
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

module.exports.listBookingsForAttendee = async (req, res) => {
  try {
    const bookings = await Booking.find({ attendee: req.attendee._id });

    const venueIDs = bookings.map((booking) => booking.venue);

    const venues = await Venue.find({ _id: { $in: venueIDs } });

    const bookingsWithVenueDetails = bookings.map((booking) => {
      const venue = venues.find(
        (v) => v._id.toString() === booking.venue.toString()
      );
      return {
        booking,
        venue,
      };
    });

    return res.status(200).json(bookingsWithVenueDetails);
  } catch (error) {
    console.error("list Bookings error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.listBookingsForOwner = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const owner = await Owner.findById(ownerId);
    const owningVenues = owner.owningVenues;

    const bookings = await Booking.find({ venue: owningVenues });

    const attendeeIds = bookings.map((booking) => booking.attendee);

    const attendees = await Attendee.find({ _id: { $in: attendeeIds } });

    const bookingsWithAttendeeDetails = bookings.map((booking) => {
      const attendee = attendees.find(
        (a) => a._id.toString() === booking.attendee.toString()
      );
      return {
        booking,
        attendee,
      };
    });

    return res.status(200).json(bookingsWithAttendeeDetails);
  } catch (error) {
    console.error(`list booking error ${error}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
