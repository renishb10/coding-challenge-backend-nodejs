// Dependencies
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

// DB Custom instance
const mySequelize = require('../data/db');

const Owner = mySequelize.define('owner', {
  // attributes
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuid(),
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [2, 100],
        msg: 'Please provide a Firstname with at least 2 char but not more than 100',
      },
    },
  },
  lastName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [1, 100],
        msg: 'Please provide a Lastname with at least 1 char but not more than 100',
      },
    },
  },
  // fullName: {
  //   type: Sequelize.VIRTUAL,
  //   get: function() {
  //     return (this.get('firstName') - this.get('lastName'));
  //   },
  // },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  // Options
  // getterMethods: {
  //   fullName: function() { `${this.firstName} ${this.lastName}`},
  // },
});

module.exports = Owner;
