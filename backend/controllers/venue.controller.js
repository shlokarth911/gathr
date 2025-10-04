const mongoose = require("mongoose");
const Owner = require("../models/Owner");
const Venue = require("../models/Venue");
const Attendee = require("../models/Attendee");

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
      city,
      amenities,
    } = req.body;

    const venue = new Venue({
      name,
      address,
      owner: ownerId,
      status,
      city,
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
    // Send JSON array
    return res.status(200).json(venues);
  } catch (error) {
    console.error("getVenues error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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
      "city",
      "status",
      "capacity",
      "price",
      "description",
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

//get details of specefic venue
module.exports.getVenueDetails = async (req, res, next) => {
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

    res.status(200).json({ success: true, venue });
  } catch (error) {
    console.log(`Error in venuecontroller getVenueDetails ${error}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports.listVenuesByCity = async (req, res) => {
  try {
    let city = req.body.city;
    if (!city || city.trim() === "") {
      if (!req.attendee || !req.attendee.city) {
        return res
          .status(400)
          .json({ message: "City not specified and attendee city not found" });
      }
      city = req.attendee.city;
    }
    const venues = await Venue.find({ city });
    res.status(200).json({ venues });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
