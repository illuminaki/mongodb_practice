// Import required dependencies
const { MongoClient } = require('mongodb'); // MongoDB client for database connection
const { faker } = require('@faker-js/faker'); // Faker library for generating fake data

// Define an async function to seed the database
async function seedDB() {
  // Connection string for MongoDB
  // - root:example are the username:password
  // - localhost:27017 is the database host and port
  // - mydatabase is the target database name
  // - authSource=admin specifies authentication database
  const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
  
  // Create a new MongoDB client instance with the connection string
  const client = new MongoClient(uri);

  try {
    // Attempt to connect to the MongoDB server
    await client.connect();
    
    // Get reference to the 'mydatabase' database
    const db = client.db('mydatabase');
    
    // Get reference to the 'users' collection within the database
    const collection = db.collection('users');

    // Generate an array of 1000 fake user objects
    // Array.from creates an array of specified length
    // Each user object contains randomly generated data using faker
    const users = Array.from({ length: 1000 }, () => ({
      // Full name (e.g., "John Doe")
      name: faker.person.fullName(),
      // Random email address (e.g., "john.doe@example.com")
      email: faker.internet.email(),
      // Random age between 18 and 80
      age: faker.number.int({ min: 18, max: 80 }),
      // Random past date for account creation
      createdAt: faker.date.past(),
      // Nested address object with fake location data
      address: {
        // Random street address (e.g., "123 Main St")
        street: faker.location.streetAddress(),
        // Random city name
        city: faker.location.city(),
        // Random country name
        country: faker.location.country()
      }
    }));

    // Insert all generated users into the 'users' collection
    // insertMany is more efficient than inserting one by one
    await collection.insertMany(users);
    
    // Log success message to console
    console.log("Database successfully populated!");
    
  } catch (error) {
    // If any error occurs during the process, log it
    console.error("Error populating database:", error);
    
  } finally {
    // Always close the database connection, whether successful or not
    // This prevents resource leaks
    await client.close();
  }
}

// Execute the seeding function
seedDB();