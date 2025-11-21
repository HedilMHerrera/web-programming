require('dotenv').config();
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

const Difficulty = require('./src/models/difficulty');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quest';

async function populate(){
  await connectDB(MONGO_URI);
  try{
    await Promise.all([
      Difficulty.deleteMany({}),
    ]);

    const difficulties = [
      {level: 'Facil', description: 'Requiere conocimientos basicos; se resuelve rapidamente.'},
      {level: 'Intermedio', description: 'Requiere analisis moderado y conocimientos previos.'},
      {level: 'Dificil', description: 'Requiere razonamiento avanzado y experiencia.'},
      {level: 'Experto', description: 'Solo para usuarios muy avanzados; alto nivel tecnico.'},
    ];

    await Difficulty.insertMany(difficulties);

    console.log('Poblado completado');

  } catch(err){
    console.error('Error populating DB:', err);
  } finally{
    await mongoose.disconnect();
  }
}

if(require.main === module){
  populate().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = populate;
