'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cohort = sequelize.define('Cohort', {
    cohort_name: DataTypes.STRING,
    cohort_title: DataTypes.STRING,
    start_date: DataTypes.DATE,
    campus: DataTypes.STRING,
    city: DataTypes.STRING,
    suppl_content_link: DataTypes.STRING,
    absence_link: DataTypes.STRING,
    slack_link: DataTypes.STRING,
    tutoring_link: DataTypes.STRING,
    feedback_link: DataTypes.STRING,
    hw_submission_link: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cohort;
};