require("dotenv").config(); // Load .env variables
const mongoose = require("mongoose");
const { _dbUrl } = require("../global/secretKey");

const connectDB = async () => {
  try {
    await mongoose.connect(_dbUrl, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
