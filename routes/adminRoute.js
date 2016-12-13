var router = require('express').Router();
var models  = require('../models');
var sequelizeConnection = models.sequelize;
var Sequelize = models.Sequelize;
var path = require('path');
var loginUser = require('../login_user');


// middleware that is specific to this router - logs time of request
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

// route for users admin page
router.get('/users',function (req, res) {

if(loginUser().name && (loginUser().role === 'admin')){

     
     res.sendFile(path.join(__dirname, '..','views','html','user-admin.html'));

    }else{
    	res.send("Sorry, you do not have user administration privilege.")
    }	
  
});
	
// route for cohort admin page
router.get('/cohorts',function (req, res) {
if(loginUser().name && (loginUser().role === 'admin')){

     
     res.sendFile(path.join(__dirname, '..','views','html','cohort-admin.html'));

    }else{
    	res.send("Sorry, you do not have cohort administration privilege.")
    }	
    
});


module.exports = router;