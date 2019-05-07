'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("case", {
      id: {
        primaryKey: true,
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      ownerFirstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ownerLastName: {
        type: Sequelize.STRING(100),
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("case");
  }
};
