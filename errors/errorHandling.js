exports.customErrorHandling = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.PSQLerrors = (err, req, res, next) => {
  const errPSQLCodes = ['22P02'];
  if (errPSQLCodes.includes(err.code)) {
    res.status(404).send({ msg: 'article not found' });
  }
};
