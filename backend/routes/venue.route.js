// backend/routes/venues.js
const express = require("express");
const { listVenues, createVenue } = require("../controllers/venue.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const router = express.Router();

// public list/search (optionalAuth so it can know req.user if present)
router.get("/", listVenues);

// protected create (requires login)
router.post("/", requireAuth, createVenue);

module.exports = router;
