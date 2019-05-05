// Dependencies
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

// DB Custom instance
const mySequelize = require('../data/db');
const Owner = require('./Owner');
const Status = require('./Status');
const Police = require('./Police');

const Case = mySequelize.define('case', {
  // attributes
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuid(),
    allowNull: false,
  },
  stolenObject: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  licenseNo: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(1200),
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

// Relationships
Case.belongsTo(Owner, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Case.belongsTo(Status, { foreignKey: { defaultValue: 1 }, onDelete: 'CASCADE' });
Case.belongsTo(Police, { as: 'police' }); // Bug with Sequelize, by default it create column as polouseId instead of policeId

module.exports = Case;
