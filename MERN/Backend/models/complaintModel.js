const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  image: { type: String },
  placeDetails: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
