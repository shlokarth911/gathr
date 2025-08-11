// backend/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const TOKEN_NAME = process.env.TOKEN_NAME || "token";
const PUBLIC_USER_COOKIE_NAME =
  process.env.PUBLIC_USER_COOKIE_NAME || "gathr_user";
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function cookieOptions() {
  return {
    httpOnly: true,
    maxAge: TOKEN_MAX_AGE,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };
}

function safeUserPayload(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    role: user.role,
  };
}

module.exports.registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
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
    const token = createToken(payload);

    // set httpOnly cookie for auth token
    res.cookie(TOKEN_NAME, token, cookieOptions());

    // set a small, readable cookie with minimal user info for UI convenience
    const publicUser = safeUserPayload(user);
    res.cookie(
      PUBLIC_USER_COOKIE_NAME,
      encodeURIComponent(JSON.stringify(publicUser)),
      {
        httpOnly: false,
        maxAge: TOKEN_MAX_AGE,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );

    // return token + user (token in body helpful during dev/testing)
    return res.status(201).json({
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

module.exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = { id: user._id, role: user.role };
    const token = createToken(payload);

    // set httpOnly cookie for auth token
    res.cookie(TOKEN_NAME, token, cookieOptions());

    // set public user cookie
    const publicUser = safeUserPayload(user);
    res.cookie(
      PUBLIC_USER_COOKIE_NAME,
      encodeURIComponent(JSON.stringify(publicUser)),
      {
        httpOnly: false,
        maxAge: TOKEN_MAX_AGE,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(`Error in Login Controller : ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// optional logout controller to clear cookies
module.exports.logoutController = (req, res) => {
  const TOKEN_NAME = process.env.TOKEN_NAME || "token";
  const PUBLIC_USER_COOKIE_NAME =
    process.env.PUBLIC_USER_COOKIE_NAME || "gathr_user";

  // clear httpOnly token cookie (include sameSite/secure if you set them during setCookie)
  res.clearCookie(TOKEN_NAME, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // clear readable user cookie
  res.clearCookie(PUBLIC_USER_COOKIE_NAME, {
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.json({ ok: true });
};
