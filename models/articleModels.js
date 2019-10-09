const db = require('../db/connection');

exports.fetchArticleById = ({ article_id }) => {
  return db
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comments_id as comment_count')
    .modify(query => {
      if (article_id) query.where({ 'articles.article_id': article_id });
    })
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: 'article does not exist'
        });
      } else return article;
    });
};
