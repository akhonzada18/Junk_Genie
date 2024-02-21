const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

// Import routes
const complaintMngtRouter = require("./Routes/complaintMngt");
const userMngtRouter = require("./Routes/userMngt");
const workerMngtRouter = require("./Routes/workerMngt");
const feedbackMngtRouter = require("./Routes/feedbackMngt");
const pickupMngtRouter = require("./Routes/pickupMngt");
const authRoute = require("./Middleware/auth");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/junkgenie");

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use(complaintMngtRouter);
app.use(userMngtRouter);
app.use(workerMngtRouter);
app.use(pickupMngtRouter);
app.use(feedbackMngtRouter);
app.use(authRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
