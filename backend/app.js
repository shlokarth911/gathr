const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

//database connection
const connectToDB = require("./db/db.config.js");
connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend origin
    credentials: true, // allow cookies if needed
  })
);

//routes
const attendeeRoutes = require("./routes/attendee.routes.js");
const ownerRoutes = require("./routes/owner.routes.js");

app.use("/attendee", attendeeRoutes);
app.use("/owner", ownerRoutes);

module.exports = app;
