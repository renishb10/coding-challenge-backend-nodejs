// Dependencies
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

// DB Custom instance
const mySequelize = require('../data/db');

// Sequelize has naming problem (Eg: When given Police the foreign key is PolouseId), so going for police_officer
const Police = mySequelize.define(
  'police',
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuid(),
      allowNull: false,
    },
    extPoliceId: {
      // External Police Id, might be alphanumeric
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg:
            'Please provide a Police Id with at least 2 chars but not more than 50',
        },
      },
    },
    firstName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg:
            'Please provide a Firstname with at least 2 chars but not more than 100',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg:
            'Please provide a Lastname with at least 1 char but not more than 100',
        },
      },
    },
    division: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg:
            'Please provide a Division with at least 1 char but not more than 50',
        },
      },
    },
    isActive: {
      // This is to active/inactive the police officer
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    isBusy: {
      // This tells whether policeman is assigned with case or free
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
        unique: true,
        fields: ['extPoliceId'],
      },
      {
        unique: false,
        fields: ['firstName', 'lastName'],
      },
      {
        unique: false,
        fields: ['firstName'],
      },
      {
        unique: false,
        fields: ['lastName'],
      },
      {
        unique: false,
        fields: ['isBusy'],
      },
    ],
  },
);

module.exports = Police;
