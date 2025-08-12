// backend/controllers/bookingController.js
const Booking = require("../models/Booking");

exports.createHold = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    const { venueId, start, end, amount = 0 } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!venueId || !start || !end)
      return res.status(400).json({ message: "venueId, start, end required" });

    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s) || isNaN(e) || s >= e)
      return res.status(400).json({ message: "Invalid start/end" });

    // Simple overlap check (prevents obvious double-book)
    const conflict = await Booking.findOne({
      venueId,
      status: { $in: ["hold", "confirmed"] },
      start: { $lt: e },
      end: { $gt: s },
    });

    if (conflict)
      return res.status(409).json({ message: "Time slot unavailable" });

    const booking = await Booking.create({
      userId,
      venueId,
      start: s,
      end: e,
      status: "hold",
      amount,
    });

    return res.status(201).json({ bookingId: booking._id, booking });
  } catch (err) {
    console.error("createHold err", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    const id = req.params.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only owner can confirm (simple rule)
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (booking.status !== "hold")
      return res.status(400).json({ message: "Only holds can be confirmed" });

    // optional final overlap check against already confirmed bookings
    const conflict = await Booking.findOne({
      venueId: booking.venueId,
      status: "confirmed",
      start: { $lt: booking.end },
      end: { $gt: booking.start },
    });
    if (conflict)
      return res.status(409).json({ message: "Slot already taken" });

    booking.status = "confirmed";
    await booking.save();

    return res.json({ ok: true, booking });
  } catch (err) {
    console.error("confirmBooking err", err);
    return res.status(500).json({ message: "Server error" });
  }
};
