const routes = require('../routes.json');

exports.sendRoutes = (req, res, next) => {
  res.status(200).json(routes);
};
