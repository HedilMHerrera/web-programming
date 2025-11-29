const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ success: true, msg: 'API viva' }));

app.use('/quest', require('./routes/quest'));

app.use((req, res) => {
	return res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;