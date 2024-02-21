const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  complaintId: {
    type: String, // Assuming complaintId is a string
  },
  feedbackCategory: String,
  rating: Number, // You can change the data type as needed (e.g., String for text-based rating)
  feedback: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
