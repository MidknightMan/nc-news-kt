const articleRouter = require('express').Router();
const { sendArticleById } = require('../controllers/articleControllers');

articleRouter.route('/:article_id').get(sendArticleById);

module.exports = articleRouter;
