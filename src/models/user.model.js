const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  fullName: { type: String },
  role: {
    type: [String],
    enum: ["patient", "doctor"],
    required: true,
  },
  nationalId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

userSchema.index({ wallet: 1, role: 1 });

module.exports = mongoose.model("User", userSchema);
