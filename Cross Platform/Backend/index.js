const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const AWS_ACCESS_KEY = "AKIAWOB4U76KJ7W5KFG4";
const AWS_SECRET_KEY = "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";
const AWS_BUCKET_NAME = "imagesforfyp";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your API routes here
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});
app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello from the API!",
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect("mongodb+srv://mahrukh:mahrukh@cluster0.ohzl5ni.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
const User = require("./models/user");
const Worker = require("./models/worker");
const WorkerLocation = require("./models/WorkerLocation");
const Complaint = require("./models/complaint");
const Feedback = require("./models/feedback");

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "junkgeniepk@gmail.com",
      pass: "cvqiukkneonizyyl",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "junkGenie.pk",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/registerW", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await Worker.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new Worker({ username, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New Worker Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/update-worker-location", async (req, res) => {
  try {
    const { workerId, latitude, longitude } = req.body;

    // Check if the worker with the given ID exists in the database
    let worker = await WorkerLocation.findOne({ wid: workerId });

    if (!worker) {
      // If the worker doesn't exist, create a new worker record
      worker = new WorkerLocation({
        wid: workerId, // Assign the provided workerId
        // Other worker details (if applicable)
      });
    }

    // Update the worker's location
    worker.latitude = latitude;
    worker.longitude = longitude;

    // Save the updated worker record to the database
    await worker.save();

    res.status(200).json({ message: "Location updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update location" });
  }
});

app.post("/register-complaint", async (req, res) => {
  try {
    const { image, placeDetails, date } = req.body;
    // Create a new complaint document
    const newComplaint = new Complaint({
      image,
      placeDetails,
      date,
    });

    console.log(req.body);
    // Save the new complaint to the database
    await newComplaint.save();

    res.status(200).json({ message: "Complaint Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register complaint" });
  }
});

// Create a route for storing feedback
app.post("/register-feedback", async (req, res) => {
  try {
    const { complaintId, feedbackCategory, rating, feedback } = req.body;

    // Create a new feedback document
    const newFeedback = new Feedback({
      complaintId,
      feedbackCategory,
      rating,
      feedback,
    });

    // Save the new feedback to the database
    await newFeedback.save();

    res.status(200).json({ message: "Feedback Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register feedback" });
  }
});
