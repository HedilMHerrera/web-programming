require('dotenv').config();
const app = require('./index');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quest';

connectDB(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost: ${PORT}`)))
    .catch(err => { console.error(err); process.exit(1); });