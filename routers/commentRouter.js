const commentRouter = require('express').Router();
const {
  sendUpdatedComment,
  sendDeleteComment
} = require('../controllers/commentControllers');

const { invalidMethod } = require('../errors/errorHandling');

commentRouter
  .route('/:comment_id')
  .patch(sendUpdatedComment)
  .delete(sendDeleteComment)
  .all(invalidMethod);

commentRouter.route('/').all(invalidMethod);

module.exports = commentRouter;
