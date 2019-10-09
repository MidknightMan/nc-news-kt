const articleRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticleById
} = require('../controllers/articleControllers');

articleRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticleById);

module.exports = articleRouter;
