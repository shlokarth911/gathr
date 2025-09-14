const express = require("express");
const router = express.Router();
const {
  createVenue,
  getVenues,
  updateVenue,
  deleteVenues,
} = require("../controllers/venue.controller");
const { authOwner } = require("../middlewares/auth.middleware");

// POST /api/venues
router.post("/create", authOwner, createVenue);
router.get("/get", authOwner, getVenues);
router.put("/update/:id", authOwner, updateVenue);
router.delete("/delete/:id", authOwner, deleteVenues);

module.exports = router;
