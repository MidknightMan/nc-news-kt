const userRouter = require('express').Router();
const { sendUserById } = require('../controllers/userControllers');

userRouter.route('/:username').get(sendUserById);

module.exports = userRouter;
