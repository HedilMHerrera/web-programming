const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connectDB(uri) {
    const mongoUri = uri || process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI no está definida');
    try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
        console.log('MongoDB conectado');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

module.exports = connectDB;
