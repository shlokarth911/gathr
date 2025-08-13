const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const attendeeModel = mongoose.model("Attendee", attendeeSchema);
module.exports = attendeeModel;
