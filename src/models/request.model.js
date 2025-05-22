const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, ref: "User" },
  patientId: { type: String, required: true, ref: "User" },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

requestSchema.index({ doctorId: 1, patientId: 1 }, { unique: true });

module.exports = mongoose.model("Requests", requestSchema);
