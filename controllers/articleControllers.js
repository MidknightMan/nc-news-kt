const {
  fetchArticleById,
  updateArticleById
} = require('../models/articleModels');

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(articleArr => {
      res.status(200).send({ article: articleArr });
    })
    .catch(next);
};

exports.sendUpdateArticleById = (req, res, next) => {
  const { params, body } = req;
  updateArticleById(params, body)
    .then(updatedArticle => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};
