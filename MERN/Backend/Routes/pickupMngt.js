const express = require("express");
const router = express.Router();

const Pickup = require("../../Backend/models/pickupsModel");

// add pickups
router.post("/admin/pickups/addPickup", async (req, res) => {
  const { status } = req.body;

  const newpickup = new Pickup(req.body);

  try {
    const pickup = await newpickup.save();
    res.json(pickup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get all pending pickups
router.get("/admin/pickups/getAllPickups", async (req, res) => {
  try {
    const pickups = await Pickup.find({}).exec();
    res.json(pickups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Verify a pickup
router.put("/admin/pickups/verifyPickup/:pickupId", async (req, res) => {
  try {
    const pickupId = req.params.pickupId;

    // Find the pickup by ID
    const existingPickup = await Pickup.findById(pickupId);

    if (!existingPickup) {
      return res.status(404).json({ error: "Pickup not found" });
    }

    // If the status is currently false, set it to true; otherwise, leave it unchanged
    const newStatus = !existingPickup.status ? true : existingPickup.status;

    // Update the pickup with the new status
    const updatedPickup = await Pickup.findByIdAndUpdate(
      pickupId,
      { status: newStatus },
      { new: true }
    ).exec();

    res.json(updatedPickup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//  Remove a pickup
router.delete("/admin/pickups/deletePickup/:pickupId", async (req, res) => {
  try {
    const pickupId = req.params.pickupId;
    const removedPickup = await Pickup.findByIdAndRemove(pickupId).exec();

    if (!removedPickup) {
      return res.status(404).json({ error: "Pickup not found" });
    }

    res.json(removedPickup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
