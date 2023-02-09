/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "users" CASCADE');

  // insert seed data
  return knex('users').insert([
    {
      name: 'Ade Ribigbe',
      email: 'azeez.io@github.com',
      role: 'admin',
    },
    {
      name: 'Some One',
      email: 'someone.io@github.com',
      role: 'user',
    },
  ]);
};
