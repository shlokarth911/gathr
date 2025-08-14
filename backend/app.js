const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectToDB = require("./db/db.config.js");

const app = express();

connectToDB();

app.use(express.json());

//routes
const attendeeRoutes = require("./routes/attendee.routes.js");

app.use("/attendee", attendeeRoutes);

module.exports = app;
