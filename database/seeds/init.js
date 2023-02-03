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
      // categoryId: 1,
      // AddonMealId: 1
    },
    {
      brandName: 'amazon',
      // categoryId: 2,
      // AddonMealId: 2
    },
    {
      brandName: 'netflix',
      // categoryId: 3,
      // AddonMealId: 3
    },
  ]);

  await knex('categories').insert([
    {
      id: 1,
      categoryName: 'vegans',
      brandId: 3,
    },
    {
      id: 2,
      categoryName: 'legumes',
      brandId: 3,
    },
    {
      id: 3,
      categoryName: 'sugars',
      brandId: 2,
    },
    {
      id: 4,
      categoryName: 'milk-products',
      brandId: 1,
    },
    {
      id: 5,
      categoryName: 'vegetables',
      brandId: 1,
    },
    {
      id: 6,
      categoryName: 'beverages',
      brandId: 1,
    },
    {
      id: 7,
      categoryName: 'cereals',
      brandId: 2,
    },
  ]);

  return knex('addon-meals').insert([
    {
      categoryId: 1,
      addonMealName: 'rice',
      price: 55,
      brandId: 1,
    },
    {
      categoryId: 2,
      addonMealName: 'yam',
      price: 70,
      brandId: 2,
    },
    {
      categoryId: 3,
      addonMealName: 'sausage',
      price: 92,
      brandId: 3,
    },
  ]);
};
