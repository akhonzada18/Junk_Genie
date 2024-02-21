const express = require("express");
const router = express.Router();

const Worker = require("../../Backend/models/workerModel");

// Add a new worker with unique email validation
router.post("/admin/workers/addWorker", async (req, res) => {
  try {
    const { username, email, password, addresses, location } = req.body;

    // Check if the email is already in use
    const existingWorker = await Worker.findOne({ email });

    if (existingWorker) {
      return res.status(400).json({ error: "Worker already exists" });
    }

    // Create a new worker
    const newWorker = new Worker({
      username,
      email,
      password,
      verified: false, // Assuming the worker is initially not verified
      addresses,
      location,
    });

    // Save the new worker
    const savedWorker = await newWorker.save();

    res.status(201).json(savedWorker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// List all workers
router.get("/admin/workers/getAllWorkers", async (req, res) => {
  try {
    const workerData = await Worker.find();
    res.json(workerData);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching unverified worker data.",
    });
  }
});
// Toggle worker status
router.put("/admin/workers/toggleStatus/:workerId", async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    // Toggle the worker status
    worker.verified = !worker.verified;

    // Save the updated worker
    const updatedWorker = await worker.save();

    // Send the updated worker as a response
    res.json(updatedWorker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}); // Delete a worker by ID
router.delete("/admin/workers/deleteWorker/:workerId", async (req, res) => {
  try {
    const workerId = req.params.workerId;

    // Check if the worker exists
    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    // Remove the worker from the database
    await Worker.findByIdAndDelete(workerId);

    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
