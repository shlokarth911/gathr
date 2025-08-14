const Attendee = require("../models/Attendee");
const bcrypt = require("bcrypt");
const { createAttendee } = require("../services/attendee.service");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const isAttendeeAlreadyExists = await Attendee.findOne({ email });
    if (isAttendeeAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const attendee = await createAttendee({
      name,
      email,
      password: hashPassword,
      city,
    });

    const token = jwt.sign({ id: attendee._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      message: "Registration Successful",
      token,
      attendee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
