exports.formatDates = list => {
  const newList = list.map(({ created_at, ...restOfObj }) => {
    const formattedObj = { ...restOfObj };
    formattedObj.created_at = new Date(created_at);
    return formattedObj;
  });
  return newList;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
