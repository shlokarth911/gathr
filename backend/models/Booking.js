const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  event: {
    type: String,
    required: true,
    trim: true,
  },

  attendee: {
    type: Schema.Types.ObjectId,
    ref: "Attendee",
    required: true,
  },

  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  numberOfGuests: {
    type: Number,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  isConfirmed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
