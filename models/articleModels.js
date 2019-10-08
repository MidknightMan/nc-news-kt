const db = require('../db/connection');

exports.fetchArticleById = ({ article_id }) => {
  console.log(article_id);
  return db
    .select('*')
    .from('articles')
    .where('article_id', article_id)
    .returning('*')
    .then(article => {
      return db('comments')
        .count('article_id', article_id)
        .then(commentCount => {
          article[0].comment_count = commentCount[0].count;
          return article;
        });
      // .then(console.log(article[0]));
    });
};
