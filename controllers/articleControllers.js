const { fetchArticleById } = require('../models/articleModels');

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(articleArr => {
      res.status(200).send({ article: articleArr });
    })
    .catch(next);
};
