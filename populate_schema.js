const { MongoClient } = require('mongodb'); // Import MongoDB client to connect to the database
const { faker } = require('@faker-js/faker'); // Import Faker.js to generate random data

// Asynchronous function to populate the database with fake data
async function populateSchema() {
  // MongoDB connection URI (ensure credentials and configuration are correct)
  const uri = "mongodb://root:example@localhost:27017/local_db?authSource=admin";
  const client = new MongoClient(uri); // Create a new MongoDB client instance

  try {
    await client.connect(); // Connect to the MongoDB server
    const db = client.db('local_db'); // Select the 'local_db' database

    // Define data structures for populating different collections
    const collections = {
      users: () => ({
        name: faker.person.fullName(), // Generate a random full name
        email: faker.internet.email(), // Generate a random email
        age: faker.number.int({ min: 18, max: 80 }), // Random age between 18 and 80 years
        createdAt: faker.date.past(), // Random past date
        address: {
          street: faker.location.streetAddress(), // Random street address
          city: faker.location.city(), // Random city
          country: faker.location.country() // Random country
        }
      }),
      orders: () => ({
        userId: faker.string.uuid(), // Random user ID related to the order
        total: faker.finance.amount(), // Randomly generated total order amount
        createdAt: faker.date.past(), // Random creation date
        status: faker.helpers.arrayElement(['pending', 'completed', 'canceled']) // Random order status
      }),
      products: () => ({
        name: faker.commerce.productName(), // Random product name
        price: faker.finance.amount(), // Random price
        category: faker.commerce.department(), // Random product category
        stock: faker.number.int({ min: 0, max: 1000 }) // Random stock quantity between 0 and 1000
      })
    };

    // Loop through each collection and insert 10 documents
    for (const [collection, generator] of Object.entries(collections)) {
      const docs = Array.from({ length: 10 }, generator); // Generate an array of 10 documents
      await db.collection(collection).insertMany(docs); // Insert documents into the collection
      console.log(`Inserted 10 documents into ${collection}`); // Log insertion confirmation
    }
  } catch (error) {
    console.error(error); // Log any errors that occur
  } finally {
    await client.close(); // Close the database connection
  }
}

populateSchema(); // Execute the function to populate the database