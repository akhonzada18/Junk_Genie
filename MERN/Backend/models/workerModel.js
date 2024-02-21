const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"], // Specifies the type as a GeoJSON Point
    required: true,
  },
  coordinates: [
    {
      lat: { type: Number },
      long: { type: Number },
    },
  ],
});

const workerSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [
    {
      name: String,
      mobileNo: String,
      houseNo: String,
      street: String,
      landmark: String,
      city: String,
      country: String,
      postalCode: String,
    },
  ],
  location: locationSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
