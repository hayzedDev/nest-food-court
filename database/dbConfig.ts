require('dotenv').config();

const dbConfig = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: +process.env.DB_DEVELOPMENT_PORT,
      database: 'postgres',
      user: 'postgres',
      password: process.env.DB_DEVELOPMENT_PASSWORD,
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_TEST_PORT,
      database: 'postgres',
      user: 'postgres',
      password: process.env.DB_TEST_PASSWORD,
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },
};

export { dbConfig };
