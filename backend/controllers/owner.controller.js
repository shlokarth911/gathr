const Owner = require("../models/Owner");
const bcrypt = require("bcrypt");
const { createOwner } = require("../services/owner.service");
const jwt = require("jsonwebtoken");
const Attendee = require("../models/Attendee");
const Venue = require("../models/Venue");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, owningVenues } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const isOwnerAlreadyExists = await Owner.findOne({ email });
    if (isOwnerAlreadyExists) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (password.lenght < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charecters long" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const owner = createOwner({
      name,
      email,
      password: hashPassword,
      owningVenues,
    });

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("owner_token", token);

    return res.status(201).json({
      message: "Registration Sucessfull",
      token,
      owner,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All feilds are required" });
    }

    const owner = await Owner.findOne({ email }).select("+password");

    if (!owner) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (!password || !owner.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, owner.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("owner_token", token);

    const ownerData = owner.toObject();
    delete ownerData.password;

    return res
      .status(200)
      .json({ message: "Login Sucessful", token, owner: ownerData });
  } catch (error) {}
};

module.exports.getOwnerProfile = (req, res, next) => {
  res.status(200).json(req.owner);
};

module.exports.updateOwnerProfile = async (req, res) => {
  try {
    // Use req.attendee._id instead of req.user.id
    const updated = await Owner.findByIdAndUpdate(req.owner._id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

module.exports.logout = (req, res, next) => {
  res.clearCookie("owner_token");

  res.status(200).json({ message: "Logged out Successfully" });
};

module.exports.listBookedAttendees = async (req, res) => {
  try {
    const ownerId = req.owner._id;

    const venues = await Venue.find({ owner: ownerId });
    const venueIds = venues.map((venue) => venue._id);

    const attendees = await Attendee.find({
      "bookings.venue": { $in: venueIds },
    });
    res.status(200).json({ success: true, attendees });
  } catch (error) {
    console.log(`Error in venuecontroller listBookedAttendees ${error}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
