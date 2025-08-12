const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  venueId: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  catererId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //booking details

  guests: {
    type: Number,
    required: true,
    default: 0,
  },
  packageName: {
    type: String,
    default: null,
  },

  hours: {
    type: Number,
    default: 1,
  },

  // time window for the event (useful for precise conflicts)
  start: {
    type: Date,
    required: true,
  },
  end: {
    tpye: Date,
    required: true,
  },

  // financials
  totalAmount: {
    type: Number,
    default: 0,
  }, // estimated or final amount
  depositAmount: {
    type: Number,
    default: 0,
  }, // how much was paid up-front

  // status:
  // - 'hold' : temporary reservation (not paid/confirmed). has holdExpiresAt
  // - 'confirmed' : completed booking (paid or admin-confirmed)
  // - 'cancelled' : cancelled by user or owner
  // - 'expired' : hold expired and was released
  status: {
    type: String,
    enum: ["hold", "confirmed", "cancelled", "expired"],
    default: "hold",
  },

  // holds only: when the hold auto-expires (useful for background cleanup)
  holdExpiresAt: {
    type: Date,
    default: null,
  },

  // optional payment/gateway reference for confirmed bookings
  paymentRef: {
    type: String,
    default: "",
  },

  // small audit fields
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
});
