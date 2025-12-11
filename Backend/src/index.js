const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
// cookie-parser removed: no refresh-token cookies in stateless JWT flow

app.get('/', (req, res) => res.json({ success: true, msg: 'API viva' }));

// Rutas principales
app.use('/quest', require('./routes/quest'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
	return res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;