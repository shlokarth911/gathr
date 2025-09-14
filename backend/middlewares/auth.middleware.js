const jwt = require("jsonwebtoken");
const attendeeModel = require("../models/Attendee");
const ownerModel = require("../models/Owner");

module.exports.authAttendee = async (req, res, next) => {
  const token =
    req.cookies.attendee_token || req.headers.authorization?.split(" ")[1];
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

module.exports.authOwner = async (req, res, next) => {
  const token =
    req.cookies.owner_token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = await ownerModel.findById(decoded.id);

    req.owner = owner;

    return next();
  } catch (error) {
    console.log("Error in AuthOwner", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
