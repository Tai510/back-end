
exports.up = function(knex, Promise) {
  return knex.schema.createTable('random', random => {
    random.increments()
    random.integer('users_id')
        .unsigned()
        .notNullable()
        .references('id.username')
        .inTable('users')
    random.string('text', 550)
    .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('random');
};
