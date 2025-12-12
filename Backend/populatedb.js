require('dotenv').config();
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

const Difficulty = require('./src/models/difficulty');
const AgeRange = require('./src/models/ageRange');
const User = require('./src/models/user');
const Category = require('./src/models/category');
const Subcategory = require('./src/models/subcategory');
async function populate() {
    await connectDB();
    try {
        const force = process.env.SEED_FORCE === 'true' || process.argv.includes('--force');

        if (force) {
            await Promise.all([
                Difficulty.deleteMany({}),
                AgeRange.deleteMany({}),
                User.deleteMany({}),
                Category.deleteMany({}),
                Subcategory.deleteMany({}),
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

        const categories = [
            { name: 'Matematicas', description: 'Estudio de relaciones numéricas, razonamiento cuantitativo, álgebra, geometría, medidas, estadística y resolución de problemas.' },
            { name: 'Tecnologia e Informatica', description: 'Estudio de herramientas digitales, computación, ofimática, programación, seguridad digital y pensamiento computacional.' },
            { name: 'Logica', description: 'Problemas de razonamiento lógico, patrones, secuencias, series, pensamiento crítico, análisis y deducción.'},
            { name: 'Lenguaje y comunicacion', description: 'Estudio del lenguaje, gramática, ortografía, redacción, comprensión lectora y análisis literario.' },
            { name: 'Ciencias Sociales', description: 'Incluye historia, geografía, ciudadanía, cultura, economía básica y el análisis del entorno social y humano.' },
            { name: 'Ciencias Naturales', description: 'Estudio de biología, química, física, ecología y el método científico.' },
            { name: 'Ciencias Graficas', description: 'Comprende biología, física, química, astronomía, ecología y el estudio de fenómenos naturales mediante el método científico.' },
        ];

        await Category.insertMany(categories);


        const categoryDocs = await Category.find({});
        const categoryMap = {};
        for (const c of categoryDocs) {
            categoryMap[c.name] = c._id;
        }

        const subcategories = [
            {  name: 'Acertijos y Problemas Logicos', description: 'Resoluciooooon de problemas mediante razonamiento estructurado, pistas, comparaciones y deducciones.', categoryId: categoryMap['Logica'],},
            {  name: 'Analogias', description: 'Identificacion de relaciones entre pares de conceptos para completar analogias verbales o visuales.', categoryId: categoryMap['Logica'], },
            {  name: 'Aritmetica',description: 'Operaciones fundamentales con numeros naturales, enteros, decimales y fracciones.', categoryId: categoryMap['Matematicas'], },
            {  name: 'Algebra', description: 'Manipulacion de expresiones algebraicas, ecuaciones e inecuaciones basicas.', categoryId: categoryMap['Matematicas'],},
            {  name: 'Calculo', description: 'Conceptos iniciales de limites, tasas de cambio y derivadas sencillas.', categoryId: categoryMap['Matematicas'],},
            {  name: 'Analisis de datos', description: 'Interpretacion de datos en graficos y tablas, identificando tendencias y comparaciones.', categoryId: categoryMap['Tecnologia e Informatica'], },
            {  name: 'Ciberseguridad', description: 'Conceptos basicos sobre amenazas digitales y buenas practicas de seguridad.', categoryId: categoryMap['Tecnologia e Informatica'], },
            {  name: 'Biologia', description: 'Estudio de los seres vivos, sus caracteristicas y procesos basicos.', categoryId: categoryMap['Ciencias Naturales'], },
            {  name: 'Astronomia', description: 'Estudio del sistema solar, estrellas, galaxias y fenomenos astronomicos.', categoryId: categoryMap['Ciencias Naturales'], },
            {  name: 'Anatomia', description: 'Sistemas del cuerpo, salud, nutricion y funciones vitales.', categoryId: categoryMap['Ciencias Naturales'], },
        ].filter(s => s.categoryId);

        await Subcategory.insertMany(subcategories);



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
