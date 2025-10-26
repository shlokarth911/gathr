// backend/api/index.js
const serverless = require("serverless-http");
const { app, connectDB } = require("../server");

let connected = false;

module.exports = serverless(async (req, res) => {
  if (!connected) {
    try {
      await connectDB();
      connected = true;
    } catch (e) {
      console.error("DB connect failed in serverless wrapper", e);
    }
  }
  return app(req, res);
});
