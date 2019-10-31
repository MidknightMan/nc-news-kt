const userRouter = require('express').Router();
const {
  sendUserById,
  sendAllUsers
} = require('../controllers/userControllers');

const { invalidMethod } = require('../errors/errorHandling');

userRouter
  .route('/:username')
  .get(sendUserById)
  .all(invalidMethod);

userRouter
  .route('/')
  .get(sendAllUsers)
  .all(invalidMethod);
module.exports = userRouter;
