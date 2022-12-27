const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { userRouter, frontendRouter, dietRouter, diaryRouter, productsRouter } = require('./routers');

const app = express();

app.use(logger(app.get('env') === 'development' ? 'dev' : 'short'));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument), swaggerUi.serve);

app.use('/user', userRouter);
app.use('/diet', dietRouter);
app.use('/diary', diaryRouter);
app.use('/products', productsRouter);

app.use('/InSight-web', frontendRouter);
app.get('/', (_, res) => res.redirect('/api-docs'));

app.use(express.static(path.resolve('./public')));

app.use((_, res) => res.status(404).json({ message: 'Not found' }));

app.use((err, req, res, next) => {
  if (err.status) {
    console.log(err.status, '-', err.message);
    return res.status(err.status).json({ message: err.message });
  }

  console.error('Unhandled error:', err.message, '| Stack:', err.stack);
  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = { app };
