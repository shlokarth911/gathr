const mongoose = require("mongoose");
const { Schema } = mongoose;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },

  status: {
    type: String,
    enum: ["booked", "available", "inactive"],
  },

  capacity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  images: [
    {
      url: { type: String, required: true },
      public_id: String,
      width: Number,
      height: Number,
      format: String,
    },
  ],

  amenities: {
    type: [String],
    required: true,
  },

  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendee",
    required: false,
  },
});

module.exports = mongoose.model("Venue", venueSchema);
