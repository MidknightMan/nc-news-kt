exports.up = function(knex) {
  console.log('creating comment table');
  return knex.schema.createTable('comments', commentTable => {
    commentTable.increments('comments_id').primary();
    commentTable.string('author').references('users.username');
    commentTable.integer('article_id').references('articles.article_id');
    commentTable.integer('votes').defaultTo(0);
    commentTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentTable.text('body').notNullable();
  });
};

exports.down = function(knex) {
  console.log('dropping comment table');
  return knex.schema.dropTable('comments');
};
