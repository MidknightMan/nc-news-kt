exports.up = function(knex) {
  return knex.schema.createTable('comments', commentTable => {
    commentTable.increments('comments_id').primary();
    commentTable
      .string('author')
      .references('users.username')
      .notNullable();
    commentTable
      .integer('article_id')
      .references('articles.article_id')
      .notNullable()
      .onDelete('CASCADE');
    commentTable.integer('votes').defaultTo(0);
    commentTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentTable.text('body').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
