const apiRouter = require('./routers/apiRouter');
const express = require('express');
const app = express();
const {
  customErrorHandling,
  PSQLerrors,
  errorCatcher
} = require('./errors/errorHandling');
app.use(express.json());

app.use('/api', apiRouter);
app.use(customErrorHandling);
app.use(PSQLerrors);
app.use(errorCatcher);
app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
});
module.exports = app;
