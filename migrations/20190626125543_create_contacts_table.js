
exports.up = function(knex, Promise) {
    return knex.schema.createTable('contacts', contacts => {
        contacts.increments()
        contacts.string('firstName', 255)
        .notNullable();
        contacts.string('lastName', 255)
        .notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('contacts');
  };
  