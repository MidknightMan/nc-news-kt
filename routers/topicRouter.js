const topicRouter = require('express').Router();
const { sendTopics } = require('../controllers/topicsControllers');

const { invalidMethod } = require('../errors/errorHandling');

topicRouter
  .route('/')
  .get(sendTopics)
  .all(invalidMethod);

module.exports = topicRouter;
