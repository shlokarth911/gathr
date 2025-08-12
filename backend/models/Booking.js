// backend/models/Booking.js  (very simple)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // who booked
    venueId: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    }, // which venue
    guests: {
      type: Number,
      default: 0,
    }, // guest count
    start: {
      type: Date,
      required: true,
    }, // event start (UTC)
    end: {
      type: Date,
      required: true,
    }, // event end (UTC)
    status: {
      type: String,
      enum: ["hold", "confirmed", "cancelled"],
      default: "hold",
    },
    amount: {
      type: Number,
      default: 0,
    }, // estimated or final price
  },
  { timestamps: true }
);

// index to speed up availability checks
bookingSchema.index({ venueId: 1, start: 1, end: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
