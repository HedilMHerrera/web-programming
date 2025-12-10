require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const spdy = require('spdy');

const app = require('./index');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quest';

const useSSL = process.env.SSL === 'true';

const CERT_DIR = path.join(__dirname, '..', 'cert');

function createServer() {
    if (!useSSL) {
    return http.createServer(app);
    }
    const options = {
    key: fs.readFileSync(path.join(CERT_DIR, 'server.key')),
    cert: fs.readFileSync(path.join(CERT_DIR, 'server.cert')),
};

    return spdy.createServer(options, app);
}

const server = createServer();

connectDB(MONGO_URI)
    .then(() => {
    server.listen(PORT, () => {
    console.log(
        `Servidor corriendo en ${useSSL ? 'https' : 'http'}://localhost:${PORT}`
    );
    console.log(`Protocolo: HTTP${useSSL ? '/2 (spdy)' : '/1.1'}`);
    });
    })
.catch(err => {
    console.error(err);
    process.exit(1);
});