const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Specifies the type as a GeoJSON Point
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  status: { type: Boolean, default: false,  },
});

const Pickup = mongoose.model("Pickup", pickupSchema);

module.exports = Pickup;
