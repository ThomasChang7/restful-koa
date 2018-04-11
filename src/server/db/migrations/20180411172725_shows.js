exports.up = function(knex, Promise) {
  return knex.schema.createTable('shows', table => {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
    table.string('genre').notNullable();
    table.integer('rating').notNullable();
    table.boolean('explicit').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shows');
};