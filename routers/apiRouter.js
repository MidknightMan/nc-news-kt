const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const { sendRoutes } = require('../controllers/apiControllers');
const { invalidMethod } = require('../errors/errorHandling');
apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);

apiRouter
  .route('/')
  .get(sendRoutes)
  .all(invalidMethod);

module.exports = apiRouter;
