declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'test' | 'production';
      PORT: string;
      host: string;
      DB_DEVELOPMENT_PORT: string;
      DB_HOST: string;
      DB_DEVELOPMENT_PASSWORD: string;
      DB_TEST_PORT: string;
      DB_TEST_PASSWORD: string;
      DATABASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
