const Booking = require("../models/Booking");

module.exports.createBooking = async ({
  event,
  attendee,
  venue,
  date,
  time,
  numberOfGuests,
  totalCost,
}) => {
  const booking = await Booking.create({
    event,
    attendee,
    venue,
    date,
    time,
    numberOfGuests,
    totalCost,
  });

  return booking;
};
