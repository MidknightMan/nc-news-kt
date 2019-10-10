const articleRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticleById,
  sendAddedComment,
  sendArticleComments,
  sendAllArticles
} = require('../controllers/articleControllers');

const { invalidMethod } = require('../errors/errorHandling');

articleRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticleById)
  .all(invalidMethod);

articleRouter
  .route('/:article_id/comments')
  .post(sendAddedComment)
  .get(sendArticleComments)
  .all(invalidMethod);

articleRouter
  .route('/')
  .get(sendAllArticles)
  .all(invalidMethod);

module.exports = articleRouter;
