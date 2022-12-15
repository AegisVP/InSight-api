const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument), swaggerUi.serve);

app.get('/', function (req, res) {
  res.send('DataBase of Contacts');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
