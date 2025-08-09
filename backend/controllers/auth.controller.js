const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All feild are required" });
    }

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // create & save user (password hashed by pre-save hook)
    const user = new User({ name, email, password, role });
    await user.save();

    // sign JWT
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    // return token + user (but not password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in registration : ", error);
    res.status(500).json({ message: "Server error" });
  }
};
