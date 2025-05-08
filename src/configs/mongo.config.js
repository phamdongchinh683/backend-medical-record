require("dotenv").config(); // Load .env variables
const mongoose = require("mongoose");
const { _dbUrl } = require("../global/secretKey");

const connectDB = async () => {
  try {
    await mongoose.connect(_dbUrl, {
      maxPoolSize: 10,
    });
    console.log("\x1b[32m%s\x1b[0m", "MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
