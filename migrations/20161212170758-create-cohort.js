'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Cohorts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cohort_name: {
        type: Sequelize.STRING
      },
      cohort_title: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      campus: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      suppl_content_link: {
        type: Sequelize.STRING
      },
      absence_link: {
        type: Sequelize.STRING
      },
      slack_link: {
        type: Sequelize.STRING
      },
      tutoring_link: {
        type: Sequelize.STRING
      },
      feedback_link: {
        type: Sequelize.STRING
      },
      hw_submission_link: {
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
    return queryInterface.dropTable('Cohorts');
  }
};