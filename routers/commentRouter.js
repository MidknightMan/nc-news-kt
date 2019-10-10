const commentRouter = require('express').Router();
const { sendUpdatedComment } = require('../controllers/commentControllers');

commentRouter.route('/:comment_id').patch(sendUpdatedComment);

module.exports = commentRouter;
