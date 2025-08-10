const User = require("../models/User");

module.exports.validateRegister = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All feilds are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be >= 6 chars" });
  }
  if (!email.include("@")) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  return next();
};

module.exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All feilds are required" });
  }
  return next();
};

module.exports.requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(400).json({ message: "Missing authorization headers" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
  } catch (error) {
    console.error("requireAuth error", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
};

module.exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    return next();
  };
};
