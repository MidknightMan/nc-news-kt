const db = require('../db/connection');

exports.updateComment = (vote, id) => {
  if (typeof vote.inc_votes !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'invalid update'
    });
  }
  if (vote.inc_votes >= 0) {
    return db('comments')
      .where('comments_id', '=', id.comment_id)
      .increment('votes', vote.inc_votes)
      .returning('*')
      .then(comm => {
        if (comm.length === 0) {
          return Promise.reject({
            status: 404,
            msg: 'not found'
          });
        } else return comm;
      });
  } else if (vote.inc_votes < 0) {
    return db('comments')
      .where('comments_id', '=', id.comment_id)
      .decrement('votes', Math.abs(vote.inc_votes))
      .returning('*')
      .then(comm => {
        if (comm.length === 0) {
          return Promise.reject({
            status: 404,
            msg: 'not found'
          });
        } else return comm;
      });
  }
};

exports.deleteComment = id => {
  return db('comments')
    .where('comments_id', id.comment_id)
    .del()
    .returning('*')
    .then(delCom => {
      if (delCom.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'not found'
        });
      }
    });
};
