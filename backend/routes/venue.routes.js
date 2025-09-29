const express = require("express");
const router = express.Router();
const {
  createVenue,
  getVenues,
  updateVenue,
  deleteVenues,
  getVenueDetails,
  listVenuesByCity,
} = require("../controllers/venue.controller");
const { authOwner, authAttendee } = require("../middlewares/auth.middleware");

// POST /api/venues
router.post("/create", authOwner, createVenue);
router.get("/get", authOwner, getVenues);
router.post("/list", authAttendee, listVenuesByCity);

router.get("/get/:id", authOwner, getVenueDetails);

router.put("/update/:id", authOwner, updateVenue);
router.delete("/delete/:id", authOwner, deleteVenues);

module.exports = router;
