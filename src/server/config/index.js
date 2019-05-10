// Module dependency.
const dotEnv = require('dotenv');
const path = require('path');
const argParser = require('argv-parser');

const cmdLineArgs = argParser.parse(process.argv, { rules: {} }).parsed;

const envName = process.env.envName || cmdLineArgs.env || 'default';

// Application Environment files.
dotEnv.config({
  path: path.join(__dirname, `${envName}.env`),
});

// Application config goes here.
const config = {
  port: parseInt(process.env.SERVER_PORT, 10),
  base_url_path: {
    v1: process.env.BASE_URL_PATH_V1,
  },
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE,
    ssl: process.env.DB_SSL == 'true' ? true : false,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};

module.exports = config;
