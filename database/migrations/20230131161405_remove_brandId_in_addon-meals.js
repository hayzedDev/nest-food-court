/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('addon-meals', function (table) {
    table
      .integer('brandId')
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('addon-meals', function (table) {
    table.dropColumn('brandId');
  });
};
