const {
  fetchArticleById,
  updateArticleById,
  addComment,
  fetchCommentsByArticle,
  fetchAllArticles,
  postArticle
} = require('../models/articleModels');

exports.sendArticleById = (req, res, next) => {
  fetchArticleById(req.params)
    .then(articleArr => {
      res.status(200).send({ article: articleArr[0] });
    })
    .catch(next);
};

exports.sendUpdateArticleById = (req, res, next) => {
  const { params, body } = req;
  updateArticleById(params, body)
    .then(updatedArticle => {
      res.status(200).send({ article: updatedArticle[0] });
    })
    .catch(next);
};

exports.sendAddedComment = (req, res, next) => {
  const { params } = req;
  const { body } = req;
  addComment(params, body)
    .then(addedComment => {
      res.status(201).send({ comment: addedComment[0] });
    })
    .catch(next);
};

exports.sendArticleComments = (req, res, next) => {
  const { params } = req;
  const {
    query: { sort_by, order }
  } = req;
  fetchCommentsByArticle(params, sort_by, order)
    .then(commentsArr => {
      res.status(200).send({ comments: commentsArr });
    })
    .catch(next);
};

exports.sendAllArticles = (req, res, next) => {
  const {
    query: { sort_by, order, author, topic }
  } = req;
  fetchAllArticles(sort_by, order, author, topic)
    .then(articlesArr => {
      res.status(200).send({ articles: articlesArr });
    })
    .catch(next);
};

exports.sendPostedArticle = (req, res, next) => {
  const { body } = req;
  console.log(body);
  postArticle(body)
    .then(addedArticle => {
      res.status(200).send({ addedArticle });
    })
    .catch(next);
};
