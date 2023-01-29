/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('brands', function (table) {
    table
      .integer('categoryId')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('addonMealId')
      .references('id')
      .inTable('addon-meals')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('brands', function (table) {
    table.dropColumn('addonMealId');
    table.dropColumn('categoryId');
  });
};
