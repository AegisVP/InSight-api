const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { authRouter, userRouter, frontendRouter } = require('./routers');

const app = express();

app.use(logger(app.get('env') === 'development' ? 'dev' : 'short'));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument), swaggerUi.serve);

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('/InSight-web', frontendRouter);

app.get('/', (_, res) => res.redirect('/InSight-web'));

app.use((_, res) => res.status(404).json({ message: 'Not found' }));

app.use((err, req, res, next) => {
  console.log('App crashed!!!: ', err.message);

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = { app };
