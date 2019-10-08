const topicRouter = require('express').Router();
const { sendTopics } = require('../controllers/topicsControllers');

topicRouter.route('/').get(sendTopics);

module.exports = topicRouter;
