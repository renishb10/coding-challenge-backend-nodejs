// Dependencies
const Sequelize = require('sequelize');

// DB Custom instance
const mySequelize = require('../data/db');

const Status = mySequelize.define(
  'status',
  {
    // attributes
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg:
            'Please provide a Name with at least 2 chars but not more than 50',
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
        fields: ['name'],
      },
    ],
  },
);

module.exports = Status;
