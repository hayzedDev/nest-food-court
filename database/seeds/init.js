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
      brandName: 'google',
      categoryId: 1,
      AddonMealId: 1
    },
    {
      brandName: 'amazon',
      categoryId: 2,
      AddonMealId: 2
    },
    {
      brandName: 'netflix',
      categoryId: 3,
      AddonMealId: 3
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
      categoryNameId: 1,
      addonMealName: 'rice',
      price: 55
    },
    {
      categoryNameId: 2,
      addonMealName: 'yam',
      price: 70
    },
    {
      categoryNameId: 3,
      addonMealName: 'sausage',
      price: 92
    },
  ]);
};
