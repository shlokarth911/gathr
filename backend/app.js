const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectToDB = require("./db/db.config.js");

const app = express();

//test route
app.get("/", (req, res) => {
  res.send(`Good`);
});

connectToDB();

app.use(express.json());

module.exports = app;
