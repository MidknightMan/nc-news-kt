const { fetchTopics } = require('../models/topicModels');

exports.sendTopics = (req, res, next) => {
  fetchTopics()
    .then(topicsArr => res.status(200).send({ topics: topicsArr }))
    .catch(next);
};
