// import knex from 'knex';

// const { async } = require('rxjs');

require('dotenv').config();

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: +process.env.DB_DEVELOPMENT_PORT,
    database: 'postgres',
    user: 'postgres',
    password: process.env.DB_DEVELOPMENT_PASSWORD,
  },
});

const arr = [`addon-meals`, `brands`, `categories`];

arr.forEach(async (table) => {
  await knex(table).del();
});
