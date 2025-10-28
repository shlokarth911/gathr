module.exports.listBookingsForUser = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // find bookings where user array contains the userId; populate as needed
    const bookings = await bookingModel
      .find({ user: userId })
      .populate("stylist user");

    return res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to list bookings" });
  }
};