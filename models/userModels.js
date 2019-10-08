const db = require('../db/connection');

exports.fetchUserById = ({ username }) => {
  return db
    .select('*')
    .from('users')
    .where('username', username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'username does not exist'
        });
      }
      return user;
    });
};
