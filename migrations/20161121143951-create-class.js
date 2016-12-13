'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      lesson: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.INTEGER
      },
      date1: {
        type: Sequelize.DATE
      },
      date2: {
        type: Sequelize.DATE
      },
      instructor1: {
        type: Sequelize.STRING
      },
      instructor2: {
        type: Sequelize.STRING
      },
      recording1: {
        type: Sequelize.STRING
      },
      recording2: {
        type: Sequelize.STRING
      },
      cohort_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Classes');
  }
};