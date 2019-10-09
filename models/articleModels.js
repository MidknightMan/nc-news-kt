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
          status: 400,
          msg: 'bad article request'
        });
      } else return article;
    });
};

exports.updateArticleById = (id, vote) => {
  const { article_id } = id;
  if (typeof vote.inc_votes !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'invalid update'
    });
  }
  if (vote.inc_votes >= 0) {
    return db('articles')
      .where('article_id', '=', id.article_id)
      .increment('votes', vote.inc_votes)
      .then(updatedArt => {
        return this.fetchArticleById({ article_id });
      });
  } else if (vote.inc_votes < 0) {
    return db('articles')
      .where('article_id', '=', id.article_id)
      .decrement('votes', Math.abs(vote.inc_votes))
      .then(updatedArt => {
        return this.fetchArticleById({ article_id });
      });
  }
};
