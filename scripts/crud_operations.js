const mongoose = require('mongoose');
const connectDB = require('../mongoose_connection'); // Import connection function
const User = require('../models/User'); // Import the User model

const run = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    // Create a new user
    const newUser = new User({
      name: "Alice Doe",
      age: 25,
      email: "alice@example.com"
    });

    await newUser.save(); // Save user to database
    console.log("✅ User created:", newUser);

    // Find all users
    const users = await User.find();
    console.log("📜 All users:", users);
    
    mongoose.connection.close(); // Close the database connection
  } catch (err) {
    console.error("❌ Error:", err);
    mongoose.connection.close();
  }
};

run();
