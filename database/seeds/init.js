/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "brands" CASCADE');
  await knex.raw('TRUNCATE TABLE "categories" CASCADE');
  await knex.raw('TRUNCATE TABLE "addon-meals" CASCADE');

  // insert seed data
  await knex('brands').insert([
    {
      id: 1,
      brandName: 'google',
    },
    {
      id: 2,
      brandName: 'amazon',
    },
    {
      id: 3,
      brandName: 'netflix',
    },
  ]);

  await knex('categories').insert([
    {
      id: 1,
      categoryName: 'vegans',
      brandNameId: 3,
    },
    {
      id: 2,
      categoryName: 'legumes',
      brandNameId: 3,
    },
    {
      id: 3,
      categoryName: 'sugars',
      brandNameId: 2,
    },
    {
      id: 4,
      categoryName: 'milk-products',
      brandNameId: 1,
    },
    {
      id: 5,
      categoryName: 'vegetables',
      brandNameId: 1,
    },
    {
      id: 6,
      categoryName: 'beverages',
      brandNameId: 1,
    },
    {
      id: 7,
      categoryName: 'cereals',
      brandNameId: 2,
    },
  ]);

  return knex('addon-meals').insert([
    {
      id: 1,
      categoryNameId: 1,
      addonMealName: 'rice',
      price: 55
    },
  ]);
};
