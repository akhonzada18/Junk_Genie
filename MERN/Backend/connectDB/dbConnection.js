const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/junkgenie", 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the database");

  } catch (error) {
    console.error("Failed to connect to the database!!!\n", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
