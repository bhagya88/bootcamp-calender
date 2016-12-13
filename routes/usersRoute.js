var router = require('express').Router();
var models  = require('../models');
var sequelizeConnection = models.sequelize;
var Sequelize = models.Sequelize;


// middleware that is specific to this router - logs time of request
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

// route for home page
router.get('/',function (req, res) {
	sequelizeConnection.sync()
		
	.then(function(){
		return models.User.findAll({});
	})
	.then(function(results){
				
			//console.log(results);
			res.json(results);
		  	// res.render('index',{
		  	// 	users: results
		  	// });
	});  	
  
});
	
// define route adding new burger
router.post('/', function (req, res) {
	console.log(req.body);
	models.User.create(req.body)
	.then(function(result){
		res.json(result);
	
	});
  
});


// define route adding new burger also add the drink
router.put('/', function (req, res) {
	models.User.update({
		name: req.body.name,
		email:req.body.email,
		cohort_name:req.body.cohort_name,
		role:req.body.role},

		{where:{github_username:req.body.github_username}})
	.then(function(result){
		res.json(result);
	})
});

module.exports = router;