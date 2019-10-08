exports.up = function(knex) {
  console.log('creating user table');
  return knex.schema.createTable('users', userTable => {
    userTable
      .string('username')
      .primary()
      .unique();
    userTable.string('avatar_url');
    userTable.string('name').notNullable(); //not null
  });
};

exports.down = function(knex) {
  console.log('dropping users table');
  return knex.schema.dropTable('users');
};
