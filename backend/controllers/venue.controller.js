const mongoose = require("mongoose");
const Owner = require("../models/Owner");
const Venue = require("../models/Venue");

module.exports.createVenue = async (req, res) => {
  try {
    const ownerId = req.owner._id;
    const {
      name,
      address,
      status,
      capacity,
      price,
      description,
      images,
      amenities,
    } = req.body;

    const venue = new Venue({
      name,
      address,
      owner: ownerId,
      status,
      capacity,
      price,
      description,
      images,
      amenities,
    });

    await venue.save();

    await Owner.findByIdAndUpdate(ownerId, {
      $push: { owningVenues: venue._id },
    });

    res.status(201).json({ success: true, venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.owner._id });
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.updateVenue = async (req, res) => {
  try {
    const venueId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid venue ID" });
    }

    const ownerId = req.owner._id;

    const venue = await Venue.findOne({ _id: venueId, owner: ownerId });

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found or unauthorized",
      });
    }

    const allowedFields = [
      "name",
      "address",
      "status",
      "capacity",
      "price",
      "decription",
      "images",
      "amenities",
    ];

    allowedFields.forEach((feild) => {
      if (req.body[feild] !== undefined) {
        venue[feild] = req.body[feild];
      }
    });

    await venue.save();

    res.status(200).json({ success: true, venue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.deleteVenues = async (req, res) => {
  try {
    const venueId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid venue ID" });
    }

    const ownerId = req.owner._id;

    const venue = await Venue.findOne({ _id: venueId, owner: ownerId });

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found or unauthorized",
      });
    }

    await Venue.findByIdAndDelete(venueId);

    res.status(200).json({ success: true, message: "Venue deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
