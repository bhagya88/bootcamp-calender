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
		return models.Cohort.findAll({});
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
	models.Cohort.create(req.body)
	.then(function(result){
		res.json(result);
	
	});
  
});


// define route adding new burger also add the drink
router.put('/', function (req, res) {
	models.Cohort.update({
      
    cohort_title: req.body.cohort_title,
    start_date:req.body.start_date,
    campus: req.body.campus,
    city: req.body.city,
    suppl_content_link: req.body.suppl_content_link,
    absence_link: req.body.absence_link,
    slack_link: req.body.slack_link,
    tutoring_link: req.body.tutoring_link,
    feedback_link: req.body.feedback_link,
    hw_submission_link: req.body.hw_submission_link

	},

		{where:{cohort_name:req.body.cohort_name}})
	.then(function(result){
		res.json(result);
	})
});


// define route adding new burger also add the drink
router.delete('/', function (req, res) {
	models.Cohort.update({
      
    cohort_title: req.body.cohort_title,
    start_date:req.body.start_date,
    campus: req.body.campus,
    city: req.body.city,
    suppl_content_link: req.body.suppl_content_link,
    absence_link: req.body.absence_link,
    slack_link: req.body.slack_link,
    tutoring_link: req.body.tutoring_link,
    feedback_link: req.body.feedback_link,
    hw_submission_link: req.body.hw_submission_link

	},

		{where:{cohort_name:req.body.cohort_name}})
	.then(function(result){
		res.json(result);
	})
});


module.exports = router;