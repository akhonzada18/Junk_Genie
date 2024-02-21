const express = require("express");
const router = express.Router();

const User = require("../../Backend/models/userModel");

// Add a new user
router.post("/admin/users/addUser", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all users
router.get("/admin/users/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Update user status
router.put("/admin/users/updateStatus/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle the account status
    user.verified = !user.verified;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
