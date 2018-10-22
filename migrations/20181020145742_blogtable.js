
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogtable', (table) => {
    table.increments('id')
    table.string('title')
    table.text('content')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blogtable')
};
