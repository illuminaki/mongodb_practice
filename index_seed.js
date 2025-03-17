// Import required dependencies
const { MongoClient } = require('mongodb'); // MongoDB client for database connection
const { faker } = require('@faker-js/faker'); // Faker library for generating fake data

// Define an async function to seed the database
async function seedDB() {
  // Connection string for MongoDB
  // - root:example are the username:password
  // - localhost:27017 is the database host and port
  // - shop_db is the target database name
  // - authSource=admin specifies authentication database
  const uri = "mongodb://root:example@localhost:27017/shop_db?authSource=admin";

  // Create a new MongoDB client instance with the connection string
  const client = new MongoClient(uri);

  try {
    // Attempt to connect to the MongoDB server
    await client.connect();
    console.log("Conectado a MongoDB");

    // Get reference to the 'shop_db' database
    const db = client.db('shop_db');

    // Get references to the collections
    const products = db.collection('products');
    const customers = db.collection('customers');
    const orders = db.collection('orders');

    // Limpiar colecciones existentes
    await products.deleteMany({});
    await customers.deleteMany({});
    await orders.deleteMany({});
    console.log("Colecciones limpiadas");

    // Insertar productos
    const productData = Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      stock: faker.number.int({ min: 10, max: 200 })
    }));
    await products.insertMany(productData);
    console.log("Productos insertados");

    // Insertar clientes
    const customerData = Array.from({ length: 15 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 70 })
    }));
    await customers.insertMany(customerData);
    console.log("Clientes insertados");

    // Insertar órdenes
    const orderData = Array.from({ length: 30 }).map(() => ({
      customerId: faker.helpers.arrayElement(customerData)._id,
      productId: faker.helpers.arrayElement(productData)._id,
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: parseFloat(faker.commerce.price()),
      date: faker.date.past()
    }));
    await orders.insertMany(orderData);
    console.log("Órdenes insertadas");

  } catch (error) {
    // If any error occurs during the process, log it
    console.error("Error populating database:", error);
  } finally {
    // Always close the database connection, whether successful or not
    await client.close();
  }
}

// Execute the seeding function
seedDB();