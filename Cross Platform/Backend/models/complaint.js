const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  
  image: String,
  placeDetails: String,
  date: String,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
