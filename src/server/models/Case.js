// Dependencies
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

// DB Custom instance
const mySequelize = require('../data/db');
const Owner = require('./Owner');
const Status = require('./Status');
const Police = require('./Police');

const Case = mySequelize.define(
  'case',
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuid(),
      allowNull: false,
    },
    stolenObject: {
      // Stolen object (bike) as of now only bike
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg:
            'Please provide a StolenObject with at least 2 chars but not more than 50',
        },
      },
    },
    licenseNo: {
      // Vehicle's license number
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg:
            'Please provide a LicenseNo with at least 2 chars but not more than 50',
        },
      },
    },
    color: {
      // Vehicle's color
      type: Sequelize.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg:
            'Please provide a Color with at least 2 chars but not more than 20',
        },
      },
    },
    type: {
      // Vehicle's type (Manufacturer + Model + Number) -> this can be seggregated later
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg:
            'Please provide a Type with at least 2 chars but not more than 100',
        },
      },
    },
    date: {
      // Date stolen
      type: Sequelize.DATE,
      allowNull: false,
    },
    description: {
      // Something about it
      type: Sequelize.STRING(1200),
      allowNull: false,
      validate: {
        len: {
          args: [5, 1200],
          msg:
            'Please provide a Description with at least 5 chars but not more than 1200',
        },
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    //Indexing basic/relevant fields for fast fetching
    indexes: [
      {
        unique: false,
        fields: ['licenseNo'],
      },
      {
        unique: false,
        fields: ['stolenObject'],
      },
    ],
  },
);

// Relationships
Case.belongsTo(Owner, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});
Case.belongsTo(Status, {
  foreignKey: { defaultValue: 1 },
  onDelete: 'CASCADE',
});
Case.belongsTo(Police, { as: 'police' }); // Bug with Sequelize, by default it create column as polouseId instead of policeId

module.exports = Case;
