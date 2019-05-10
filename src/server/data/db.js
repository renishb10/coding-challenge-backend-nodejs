// Dependencies
const Sequelize = require('sequelize');
const config = require('../config');

// Initiate DB
const mySequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.type,
    logging: false,
    dialectOptions: {
      ssl: config.db.ssl,
    },
  },
);

// Print DB status to console
mySequelize
  .authenticate()
  .then(() => {
    logger.info(
      `Database: Connection has been established successfully with ${
        config.db.host
      } : ${config.db.name}`,
    );
  })
  .catch(err => {
    logger.error(
      `Unable to connect to the database - ${config.db.host} : ${
        config.db.name
      }`,
      err,
    );
  });

module.exports = mySequelize;
