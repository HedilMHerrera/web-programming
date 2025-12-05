require('dotenv').config();
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

const Difficulty = require('./src/models/difficulty');
const AgeRange = require('./src/models/ageRange');
const User = require('./src/models/user');

async function populate() {
    await connectDB();
    try {
        const force = process.env.SEED_FORCE === 'true' || process.argv.includes('--force');

        if (force) {
            await Promise.all([
                Difficulty.deleteMany({}),
                AgeRange.deleteMany({}),
                User.deleteMany({}),
            ]);
        }

        const difficulties = [
            { level: 'Facil', description: 'Requiere conocimientos basicos; se resuelve rapidamente.' },
            { level: 'Intermedio', description: 'Requiere analisis moderado y conocimientos previos.' },
            { level: 'Dificil', description: 'Requiere razonamiento avanzado y experiencia.' },
            { level: 'Experto', description: 'Solo para usuarios muy avanzados; alto nivel tecnico.' },
        ];

        await Difficulty.insertMany(difficulties);

        const ageRanges = [
            { minAge: 6, maxAge: 8, description: 'Niños pequeños, actividades simples.' },
            { minAge: 9, maxAge: 12, description: 'Niños con habilidades básicas de lectura y logica.' },
            { minAge: 13, maxAge: 17, description: 'Adolescentes, contenidos de mayor complejidad.' },
            { minAge: 18, maxAge: 25, description: 'Jovenes adultos, temas académicos o profesionales.' },
            { minAge: 26, maxAge: 40, description: 'Adultos, contenidos avanzados.' },
            { minAge: 41, maxAge: 120, description: 'Adultos mayores, enfoque práctico y claro.' },
        ];

        await AgeRange.insertMany(ageRanges);

        const users = [
            { name: 'Admin', email: 'admin@example.com', password: 'admin123', roles: ['admin'] },
            { name: 'Editor', email: 'editor@example.com', password: 'editor123', roles: ['editor'] },
            { name: 'Gestor', email: 'gestor@example.com', password: 'gestor123', roles: ['gestor'] },
            { name: 'Estudiante', email: 'estudiante@example.com', password: 'estudiante123', roles: ['estudiante'] },
        ];

        for (const u of users) {
            const exists = await User.findOne({ email: u.email });
            if (!exists) {
                const user = new User(u);
                await user.save();
                console.log('Usuario creado:', u.email);
            } else {
                console.log('Usuario ya existe, omitido:', u.email);
            }
        }

        console.log('Poblado completado');

    } catch (err) {
        console.error('Error al poblar BD:', err);
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
