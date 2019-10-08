exports.up = function(knex) {
  return knex.schema.createTable('articles', articleTable => {
    console.log('creating articles table');
    articleTable.increments('article_id').primary();
    articleTable.text('title').notNullable();
    articleTable.text('body');
    articleTable.integer('votes').defaultTo(0);
    articleTable.string('topic').references('topics.slug');
    articleTable.string('author').references('users.username');
    articleTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  console.log('dropping articles table');
  return knex.schema.dropTable('articles');
};
