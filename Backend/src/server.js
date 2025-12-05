require('dotenv').config();
const app = require('./index');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

connectDB()
    .then(() => app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)))
    .catch(err => { console.error(err); process.exit(1); });