const express = require("express");
const router = express.Router();
const Feedback = require("../../Backend/models/feedbackModel");

// Add new feedback
router.post("/admin/feedbacks/addFeedback", async (req, res) => {
  try {
    const { complaintId, feedbackCategory, rating, feedback } = req.body;

    // Assuming complaintId is a string, you might need to validate it or convert it as needed

    const newFeedback = new Feedback({
      complaintId,
      feedbackCategory,
      rating,
      feedback,
    });
    const savedFeedback = await newFeedback.save();

    res
      .status(201)
      .json({ message: "Feedback added successfully", savedFeedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get all feedbacks
router.get("/admin/feedbacks/getAllFeedbacks", async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find();
    res.status(200).json(allFeedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
