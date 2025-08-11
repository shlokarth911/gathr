require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gathr_dev";

app.use(cors());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.route.js");
const venueRoutes = require("./routes/venue.route.js");
const quoteRoutes = require("./routes/quote.route.js");

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api", quoteRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connection sucessfull");
  })
  .catch((err) => {
    console.log(`Error connecting database : ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
