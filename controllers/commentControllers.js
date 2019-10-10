const { updateComment, deleteComment } = require('../models/commentModels');

exports.sendUpdatedComment = (req, res, next) => {
  const { body, params } = req;
  updateComment(body, params)
    .then(updatedComment => {
      res.status(200).send({ comment: updatedComment });
    })
    .catch(next);
};

exports.sendDeleteComment = (req, res, next) => {
  const { params } = req;
  deleteComment(params)
    .then(deletedComment => res.sendStatus(204))
    .catch(next);
};
