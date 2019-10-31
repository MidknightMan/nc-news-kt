const { fetchUserById, fetchAllUsers } = require('../models/userModels');
exports.sendUserById = (req, res, next) => {
  fetchUserById(req.params)
    .then(user => {
      res.status(200).send({ user: user[0] });
    })
    .catch(next);
};

exports.sendAllUsers = (req, res, next) => {
  fetchAllUsers().then(userList => {
    res
      .status(200)
      .send({ users: userList })
      .catch(next);
  });
};
