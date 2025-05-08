const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ["patient", "doctor"], required: true },
  nationalId: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.index({ phone: 1 });
userSchema.index({ email: 1 });
userSchema.index({ wallet: 1 });
userSchema.index({ nationalId: 1 });

module.exports = mongoose.model("User", userSchema);
