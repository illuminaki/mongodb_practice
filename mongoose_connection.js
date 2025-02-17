const mongoose = require('mongoose'); // Import Mongoose library
require('dotenv').config(); // Load environment variables from .env file

/**
 * Function to connect to MongoDB using Mongoose.
 * It reads the MongoDB URI from the environment variables.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Ensures use of new MongoDB URL parser
      useUnifiedTopology: true, // Enables new server discovery and monitoring engine
    });
    console.log('🔥 MongoDB Connected Successfully'); // Log success message
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err); // Log error message
    process.exit(1); // Exit process with failure if connection fails
  }
};

module.exports = connectDB; // Export the function to be used in other parts of the application
