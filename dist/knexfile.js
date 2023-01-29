"use strict";
// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            port: +process.env.DB_DEVELOPMENT_PORT,
            database: 'postgres',
            user: 'postgres',
            password: process.env.DB_DEVELOPMENT_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        seeds: { directory: './database/seeds' },
        ...knexSnakeCaseMappers,
    },
    test: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST,
            port: +process.env.DB_TEST_PORT,
            database: 'postgres',
            user: 'postgres',
            password: process.env.DB_TEST_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: { directory: './database/seeds' },
        ...knexSnakeCaseMappers,
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: { directory: './database/seeds' },
        ...knexSnakeCaseMappers,
    },
};
