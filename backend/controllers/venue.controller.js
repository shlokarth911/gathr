const Venue = require("../models/Venue");

module.exports.createVenue = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      location,
      capacityMin,
      capacityMax,
      basePrice,
      priceUnit,
      amenities = [],
      packages = [],
    } = req.body;

    if (!name || !address || !city) {
      return res
        .status(400)
        .json({ message: "name, address, city are required" });
    }

    const ownerId = req.user._id;

    const venue = new Venue({
      ownerId,
      name,
      address,
      city,
      location,
      capacityMin: capacityMin || 1,
      capacityMax: capacityMax || 50,
      basePrice: basePrice || 0,
      priceUnit: priceUnit || "event",
      amenities,
      packages,
    });

    await venue.save();
    return res.status(201).json({ message: "Venue created", venue });
  } catch (error) {
    console.error("createVenue error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.listVenues = async (req, res) => {
  try {
    const { city, minCapacity, maxPrice, q, page = 1, limit = 20 } = req.query;
    const filters = {};

    if (city) filters.city = new RegExp(`^${city}$`, "i"); // exact city case-insensitive
    if (minCapacity) filters.capacityMax = { $gte: Number(minCapacity) };
    if (maxPrice) filters.basePrice = { $lte: Number(maxPrice) };
    if (q) filters.name = { $regex: q, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [venues, count] = await Promise.all([
      Venue.find(filters)
        .sort({ isFeatured: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Venue.countDocuments(filters),
    ]);

    return res.json({
      meta: { total: count, page: Number(page), limit: Number(limit) },
      data: venues,
    });
  } catch (err) {
    console.error("listVenues error", err);
    return res.status(500).json({ message: "Server error" });
  }
};
