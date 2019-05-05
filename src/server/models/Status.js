// Dependencies
const Sequelize = require('sequelize');

// DB Custom instance
const mySequelize = require('../data/db');

const Status = mySequelize.define('status', {
  // attributes
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  // Options if any later
});

module.exports = Status;