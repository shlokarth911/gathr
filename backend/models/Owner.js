const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  owningVenues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
  ],
});

module.exports = mongoose.model("Owner", ownerSchema);
