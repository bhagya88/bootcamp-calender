'use strict';
var fs = require('fs');
var path = require('path');
var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    // convert callback into a promise
    var p = new Promise(function(resolve,reject){

        // read the csv file
        fs.readFile(path.join(__dirname,'..','db','users.csv'),'utf8',function(err,contents){
              if(err){
                reject(err);
              }else{
           
                // convert csv file contents to array of objects
                  var usersArr = contents.trim().split(/\r?\n/)  // converts it into array of lines

                              // converts each line into array of columns values
                              .map(function(line){
                                return line.split(',');
                              })

                              // converts each line from an array to an object and returns an array of objects
                              .reduce(function(users,row){
                                users = users || [];
                                users.push({
                                  name: row[0],
                                  email:row[1],
                                  github_username:row[2],
                                  cohort_name:row[3],
                                  role:row[4]
                                })
                                return users;
                              },[])
                
                // resolve the data we need              
                 resolve(usersArr);
              }
      })
 })    

  
  // return the promise
   return p.then(function(data){
      return models.User.bulkCreate(data);
   })

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return models.User.destroy({where:{id:{$lte:7}}});
  }
};
