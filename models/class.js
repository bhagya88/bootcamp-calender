'use strict';
module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define('Class', {
    subject: DataTypes.STRING,
    lesson: DataTypes.STRING,
    length: DataTypes.INTEGER,
    date1: DataTypes.DATE,
    date2: DataTypes.DATE,
    instructor1: DataTypes.STRING,
    instructor2: DataTypes.STRING,
    recording1: DataTypes.STRING,
    recording2: DataTypes.STRING,
    cohort_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Class;
};