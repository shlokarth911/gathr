// backend/routes/quotes.js
const express = require("express");
const router = express.Router();
const { quickQuote } = require("../controllers/quote.controller.js");

// POST /api/venues/:id/quote
router.post("/venues/:id/quote", quickQuote);

module.exports = router;
