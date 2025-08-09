require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gathr_dev";

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.route.js");

app.use("/api/auth", authRoutes);

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
