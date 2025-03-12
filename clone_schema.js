const { MongoClient } = require('mongodb');

async function cloneSchema() {
  // Configuración de las conexiones
  const sourceUri = "mongodb://root:example@remote_host:27017/source_db?authSource=admin"; // Cambia remote_host por tu servidor remoto
  const targetUri = "mongodb://root:example@localhost:27017/local_db?authSource=admin";

  const sourceClient = new MongoClient(sourceUri);
  const targetClient = new MongoClient(targetUri);

  try {
    // Conectar a ambas bases de datos
    await sourceClient.connect();
    await targetClient.connect();
    const sourceDB = sourceClient.db('source_db');
    const targetDB = targetClient.db('local_db');

    // Obtener lista de colecciones
    const collections = await sourceDB.listCollections().toArray();
    console.log('Colecciones encontradas:', collections.map(c => c.name));

    // Procesar cada colección
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const options = collectionInfo.options || {};

      // Crear colección en la base local
      await targetDB.createCollection(collectionName, options);
      console.log(`Creada colección: ${collectionName}`);

      // Obtener y replicar índices
      const indexes = await sourceDB.collection(collectionName).indexes();
      for (const index of indexes) {
        if (index.name !== '_id_') { // Evitar duplicar el índice _id
          await targetDB.collection(collectionName).createIndex(index.key, {
            unique: index.unique || false,
            name: index.name,
            ...index // Incluye otras opciones como partialFilterExpression si existen
          });
          console.log(`Creado índice ${index.name} en ${collectionName}`);
        }
      }
    }

    console.log('¡Esquema clonado con éxito!');
  } catch (error) {
    console.error('Error clonando el esquema:', error);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

cloneSchema();