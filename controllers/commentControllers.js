const { updateComment } = require('../models/commentModels');

exports.sendUpdatedComment = (req, res, next) => {
  const { body, params } = req;
  updateComment(body, params)
    .then(updatedComment => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch(next);
};
