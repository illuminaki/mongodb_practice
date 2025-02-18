const User = require('../models/User'); // Import the User model

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and send a 500 status code
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by their ID
    if (!user) return res.status(404).json({ message: 'User not found' }); // If user not found, return a 404 error
    res.json(user); // Send the user as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and send a 500 status code
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body); // Create a new user instance with the request body
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Send the created user as a JSON response with a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors and send a 400 status code
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find and update the user by their ID
    if (!updatedUser) return res.status(404).json({ message: 'User not found' }); // If user not found, return a 404 error
    res.json(updatedUser); // Send the updated user as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and send a 500 status code
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Find and delete the user by their ID
    if (!deletedUser) return res.status(404).json({ message: 'User not found' }); // If user not found, return a 404 error
    res.json({ message: 'User deleted successfully' }); // Send a success message as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors and send a 500 status code
  }
};