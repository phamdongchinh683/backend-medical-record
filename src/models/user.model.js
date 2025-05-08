const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ["patient", "doctor"], required: true },
  nationalId: { type: String, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
