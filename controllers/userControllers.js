const { fetchUserById } = require('../models/userModels');
exports.sendUserById = (req, res, next) => {
  fetchUserById(req.params)
    .then(user => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};
