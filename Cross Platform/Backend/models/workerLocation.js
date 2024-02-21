const mongoose = require("mongoose");

// Define the schema for WorkerLocation
const workerLocationSchema = new mongoose.Schema({
  wid: {
    type: String, // Assuming workerId is a string
    required: true, // Ensure workerId is provided
    unique: true, // Ensure workerId is unique
  },
  latitude: {
    type: Number, // Assuming latitude is a number
    required: true, // Ensure latitude is provided
  },
  longitude: {
    type: Number, // Assuming longitude is a number
    required: true, // Ensure longitude is provided
  },
  // Other fields related to worker location (if applicable)
});

// Create the WorkerLocation model
const WorkerLocation = mongoose.model("WorkerLocation", workerLocationSchema);

module.exports = WorkerLocation;
