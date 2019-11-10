const articleRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticleById,
  sendAddedComment,
  sendArticleComments,
  sendAllArticles,
  sendPostedArticle
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
  .post(sendPostedArticle)
  .all(invalidMethod);

module.exports = articleRouter;
