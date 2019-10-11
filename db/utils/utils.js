exports.formatDates = list => {
  const newList = list.map(({ created_at, ...restOfObj }) => {
    const formattedObj = { ...restOfObj };
    formattedObj.created_at = new Date(created_at);
    return formattedObj;
  });
  return newList;
};

exports.makeRefObj = list => {
  const articleRef = {};
  list.forEach(article => {
    articleRef[article.title] = article.article_id;
  });
  return articleRef;
};

exports.formatComments = (comments, articleRef) => {
  const formatComment = comments.map(
    ({ created_by, belongs_to, ...restOfComment }) => {
      const formattedComment = { ...restOfComment };
      formattedComment.author = created_by;
      formattedComment.article_id = articleRef[belongs_to];
      return formattedComment;
    }
  );
  return this.formatDates(formatComment);
};
