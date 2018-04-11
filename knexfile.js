const path = require('path');
require('dotenv').config();

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${process.env.dbUsername}:${process.env.dbPassword}@localhost:5432/koa_api_test`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: `postgres://${process.env.dbUsername}:${process.env.dbPassword}@localhost:5432/koa_api`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
};
