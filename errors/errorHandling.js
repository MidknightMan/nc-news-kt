exports.customErrorHandling = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.PSQLerrors = (err, req, res, next) => {
  const errPSQLCodes = ['22P02', '23502', '42703'];

  if (errPSQLCodes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: 'not found' });
  } else next(err);
};

exports.errorCatcher = (err, req, res, next) => {
  console.log(err);
};

exports.invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: 'bad method' });
};

exports.routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: 'route not found' });
};
