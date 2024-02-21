const express = require("express");
const router = express.Router();

const Complaint = require("../../Backend/models/complaintModel");

// Add a new complaint
router.post("/admin/complaints/addComplaint", async (req, res) => {
  try {
    const { image, placeDetails, date, status } = req.body;
    const newComplaint = new Complaint({ image, placeDetails, date, status });

    const savedComplaint = await newComplaint.save();

    res
      .status(200)
      .json({ message: "Complaint added successfully", savedComplaint });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all complaints
router.get("/admin/complaints/getAllComplaints", async (req, res) => {
  try {
    const allComplaints = await Complaint.find();
    res.status(200).json(allComplaints);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all verified complaints
router.get("/admin/complaints/getverifiedComplaints", async (req, res) => {
  try {
    const allComplaints = await Complaint.find({ status: true });
    res.status(200).json(allComplaints);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Toggle status of a complaint
router.put("/admin/complaints/toggleStatus/:complaintId", async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Toggle the status
    complaint.status = !complaint.status;
    const updatedComplaint = await complaint.save();

    res.status(200).json(updatedComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a complaint
router.delete(
  "/admin/complaints/deleteComplaint/:complaintId",
  async (req, res) => {
    try {
      const complaintId = req.params.complaintId;
      const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

      if (!deletedComplaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      res
        .status(200)
        .json({ message: "Complaint removed successfully", deletedComplaint });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
