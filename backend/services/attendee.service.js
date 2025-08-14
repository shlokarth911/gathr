const attendeeModel = require("../models/Attendee");

module.exports.createAttendee = async ({ name, email, password, city }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const attendee = await attendeeModel.create({
    name,
    email,
    password,
    city,
  });

  return attendee;
};
