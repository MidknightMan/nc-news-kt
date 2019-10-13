const db = require('../db/connection');

exports.fetchArticleById = ({ article_id }) => {
  return db
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .modify(query => {
      if (article_id) query.where({ 'articles.article_id': article_id });
    })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'not found'
        });
      }
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
  if (!vote.inc_votes) vote.inc_votes = 0;
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

exports.addComment = ({ article_id }, { username, body }) => {
  return db('comments')
    .insert({ author: username, article_id: article_id, body: body })
    .returning('*')
    .then(postedComment => {
      if (!postedComment) {
        return Promise.reject({
          status: 400,
          msg: 'bad request'
        });
      } else return postedComment;
    });
};

exports.fetchCommentsByArticle = (
  { article_id },
  sorter = 'created_at',
  order = 'desc'
) => {
  return db
    .select('*')
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sorter, order)
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'not found'
        });
      } else return comments;
    });
};

exports.fetchAllArticles = (
  sortby = 'created_at',
  order = 'desc',
  author,
  topic
) => {
  return db
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .orderBy(sortby, order)
    .modify(query => {
      if (author) query.where({ 'articles.author': author });
      if (topic) query.where({ 'articles.topic': topic });
    })
    .then(articleList => {
      if (author && typeof author === 'string') {
        return this.checkAuthor(author).then(authorCheck => {
          if (authorCheck.length === 0) {
            return Promise.reject({
              status: 404,
              msg: 'not found'
            });
          } else return articleList;
        });
      }
      if (topic && typeof topic === 'string') {
        return this.checkTopic(topic).then(topicCheck => {
          if (topicCheck.length === 0) {
            return Promise.reject({
              status: 404,
              msg: 'not found'
            });
          } else return articleList;
        });
      } else if (articleList.length === 0 || !articleList) {
        return Promise.reject({ status: 400, msg: 'bad request' });
      } else return articleList;
    });
};

exports.checkAuthor = author => {
  return db
    .select('username')
    .from('users')
    .where({ username: author });
};

exports.checkTopic = topic => {
  return db
    .select('slug')
    .from('topics')
    .where({ slug: topic });
};
