const userRouter = require('express').Router();
const { sendUserById } = require('../controllers/userControllers');

const { invalidMethod } = require('../errors/errorHandling');

userRouter
  .route('/:username')
  .get(sendUserById)
  .all(invalidMethod);

module.exports = userRouter;
