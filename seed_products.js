const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

async function seedDB() {
  const uri = "mongodb://root:example@localhost:27017/store_db?authSource=admin";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('store_db');
    
    // Limpiar colección previa si existe
    await db.collection('products').drop().catch(() => console.log('No había colección previa'));
    
    const products = [];
    const categories = ["Electronics", "Clothing", "Books", "Toys", "Sports", "Home"];
    
    // Generar 50,000 productos
    for (let i = 0; i < 50000; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        category: faker.helpers.arrayElement(categories),
        stock: faker.number.int({ min: 0, max: 1000 })
      });
    }
    
    // Insertar en lotes de 10,000 para mejor rendimiento
    for (let i = 0; i < products.length; i += 10000) {
      const batch = products.slice(i, i + 10000);
      await db.collection('products').insertMany(batch);
      console.log(`Insertados ${i + batch.length} productos...`);
    }
    
    console.log('¡Base de datos poblada con 50,000 productos!');
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
  } finally {
    await client.close();
  }
}

seedDB();