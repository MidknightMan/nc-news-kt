const articleRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticleById,
  sendAddedComment,
  sendArticleComments,
  sendAllArticles
} = require('../controllers/articleControllers');

articleRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticleById);

articleRouter
  .route('/:article_id/comments')
  .post(sendAddedComment)
  .get(sendArticleComments);

articleRouter.route('/').get(sendAllArticles);

module.exports = articleRouter;
