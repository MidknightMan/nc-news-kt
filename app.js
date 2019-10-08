const apiRouter = require('./routers/apiRouter');
const express = require('express');
const app = express();
const { customErrorHandling } = require('./errors/errorHandling');
app.use(express.json());

app.use('/api', apiRouter);
app.use(customErrorHandling);
module.exports = app;
