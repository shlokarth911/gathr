const jwt = require("jsonwebtoken");
const attendeeModel = require("../models/Attendee");

module.exports.authAttendee = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const attendee = await attendeeModel.findById(decoded.id);

    req.attendee = attendee;

    return next();
  } catch (error) {
    console.log("Error in AuthAttendee", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
