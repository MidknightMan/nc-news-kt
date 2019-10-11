const apiRouter = require('./routers/apiRouter');
const express = require('express');
const app = express();
const {
  customErrorHandling,
  PSQLerrors,
  invalidMethod,
  errorCatcher,
  routeNotFound
} = require('./errors/errorHandling');
app.use(express.json());

app.use('/api', apiRouter);
app.use(customErrorHandling);
app.use(PSQLerrors);
app.use(errorCatcher);
app.all('/*', routeNotFound);
app.use(invalidMethod);
module.exports = app;
