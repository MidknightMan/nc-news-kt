const db = require('../db/connection');

exports.fetchUserById = ({ username }) => {
  return db
    .select('*')
    .from('users')
    .where('username', username);
};
