require('dotenv').config();
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

const Difficulty = require('./src/models/difficulty');
const AgeRange = require('./src/models/ageRange');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quest';

async function populate() {
    await connectDB(MONGO_URI);
    try {
        await Promise.all([
            Difficulty.deleteMany({}),
            AgeRange.deleteMany({}),
        ]);

        const difficulties = [
            { level: 'Facil', description: 'Requiere conocimientos basicos; se resuelve rapidamente.' },
            { level: 'Intermedio', description: 'Requiere analisis moderado y conocimientos previos.' },
            { level: 'Dificil', description: 'Requiere razonamiento avanzado y experiencia.' },
            { level: 'Experto', description: 'Solo para usuarios muy avanzados; alto nivel tecnico.' },
        ];

        await Difficulty.insertMany(difficulties);

        const ageRanges = [
            { range: '6–8 años', description: 'Niños pequeños, actividades simples.' },
            { range: '9–12 años', description: 'Niños con habilidades básicas de lectura y lógica.' },
            { range: '13–17 años', description: 'Adolescentes, contenidos de mayor complejidad.' },
            { range: '18–25 años', description: 'Jóvenes adultos, temas académicos o profesionales.' },
            { range: '26–40 años', description: 'Adultos, contenidos avanzados.' },
            { range: '41+ años', description: 'Adultos mayores, enfoque práctico y claro.' },
        ];

        await AgeRange.insertMany(ageRanges);

        console.log('Poblado completado');

    } catch (err) {
        console.error('Error populating DB:', err);
    } finally {
        await mongoose.disconnect();
    }
}

if (require.main === module) {
    populate().catch(err => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = populate;
