const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

//database connection
const connectToDB = require("./db/db.config.js");
connectToDB();

app.use(express.json());
app.use(cookieParser());

//routes
const attendeeRoutes = require("./routes/attendee.routes.js");

app.use("/attendee", attendeeRoutes);

module.exports = app;
