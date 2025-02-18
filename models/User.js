const mongoose = require('mongoose');

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
