const routes = require('../routes.json');

exports.sendRoutes = (req, res, next) => {
  console.log(routes);
  res.status(200).json(routes);
};
