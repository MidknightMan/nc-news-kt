const apiRouter = require('express').Router();
const topicRouter = require('./topicRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const { sendRoutes } = require('../controllers/apiControllers');
apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);

apiRouter.route('/').get(sendRoutes);

module.exports = apiRouter;
