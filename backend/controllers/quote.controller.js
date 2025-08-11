// backend/controllers/quoteController.js
const Venue = require("../models/Venue");

exports.quickQuote = async (req, res) => {
  try {
    const venueId = req.params.id;
    const { guests = 0, packageName = null, hours = 1 } = req.body;

    if (!venueId) return res.status(400).json({ message: "Missing venue id" });

    const venue = await Venue.findById(venueId).lean();
    if (!venue) return res.status(404).json({ message: "Venue not found" });

    // compute estimate using model method (we used instance method earlier; rehydrate if needed)
    // If we have venue as plain object, compute fallback:
    let estimate = 0;
    let usedPackage = null;

    // find package if requested
    if (packageName && Array.isArray(venue.packages)) {
      usedPackage = venue.packages.find((p) => p.name === packageName) || null;
    }

    // price logic mirrored from your model method (safe to compute here based on data)
    if (usedPackage) {
      if (usedPackage.priceUnit === "person")
        estimate = usedPackage.price * Number(guests);
      else if (usedPackage.priceUnit === "hour")
        estimate = usedPackage.price * Number(hours);
      else estimate = usedPackage.price;
    } else {
      // fallback to basePrice
      if (venue.priceUnit === "person")
        estimate = (venue.basePrice || 0) * Number(guests);
      else if (venue.priceUnit === "hour")
        estimate = (venue.basePrice || 0) * Number(hours);
      else estimate = venue.basePrice || 0;
    }

    return res.json({
      venue: {
        id: venue._id,
        name: venue.name,
        city: venue.city,
        capacityMin: venue.capacityMin,
        capacityMax: venue.capacityMax,
      },
      quote: {
        guests: Number(guests),
        packageName: usedPackage ? usedPackage.name : null,
        hours: Number(hours),
        estimate: Number(estimate),
      },
      success: true,
    });
  } catch (err) {
    console.error("quickQuote error", err);
    return res.status(500).json({ message: "Server error" });
  }
};
