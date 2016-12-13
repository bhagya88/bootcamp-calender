var router = require('express').Router();
var models  = require('../models');
var sequelizeConnection = models.sequelize;
var Sequelize = models.Sequelize;
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var loginUser = require('../login_user');



// middleware that is specific to this router - logs time of request
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

// route for  events
router.get('/',function (req, res) {
	console.log("login user")

	

	 models.Class.findAll({where: {cohort_name: loginUser().cohort}, attributes: [
	 									'lesson',
	 									'subject',
	 									'instructor1',
	 									'instructor2',
	 									'recording1',
			      						'recording2',
	 									[sequelizeConnection.fn('date_format', sequelizeConnection.col('date1'), '%Y-%m-%d'), 'date1'],
	 									[sequelizeConnection.fn('date_format', sequelizeConnection.col('date2'), '%Y-%m-%d'), 'date2']
	 									]

	 								})
	.then(function(results){

		
	    res.json(results);
	});  	
  
});
	

// route for updating events
router.put('/', function (req, res) {
	

	var events = req.body.events;

	if(events){
		events.forEach(function(event){
			if(event.date2 != "Invalid date"){
			 models.Class.update({date1: new Date(event.date1),date2: new Date(event.date2)},{where: {$and:[{lesson:event.lesson},{cohort_name:loginUser().cohort}]}});
			}else{
			 models.Class.update({date1: new Date(event.date1)},{where: {$and:[{lesson:event.lesson},{cohort_name:loginUser().cohort}]}});
			}

		});
	}          
	res.json(req.body.events);
});


// route for generating readme
router.get('/readme', function (req, res) {

	//models.Class.findAll({ where: {$and:[{lesson:event.lesson},{cohort_name:loginUser().cohort}]},
	models.Class.findAll({ where: {cohort_name:loginUser().cohort},
		attributes: [
			      		'subject',
			      		'lesson',
			      		'instructor1',
			      		'instructor2',
			      		'recording1',
			      		'recording2',

			      		[sequelizeConnection.fn('date_format', sequelizeConnection.col('date1'), '%Y-%m-%d'), 'date1'],
			      		[sequelizeConnection.fn('date_format', sequelizeConnection.col('date2'), '%Y-%m-%d'), 'date2']
			  		],

  		order:'date1'
  	})
	.then(function(classes){


		models.Cohort.findOne({cohort_name:loginUser().cohort})

		.then(function(cohort){

			var markup = generateMarkup(classes,cohort);
				fs.writeFile(path.join(__dirname, '..','views','markup','README.md'),markup,'utf8',function(err){
				if (err) throw err;
				res.sendFile(path.join(__dirname, '..','views','markup','README.md'));
		});

		});

		
	});
});


// route for the recording 
router.get('/recording', function (req, res) {
	res.sendFile(path.join(__dirname, '..','views','html','recording.html'));
});


// route for updating recording and instructor
router.put('/recording', function (req, res) {
	//var class = req.body.class;
	models.Class.update(req.body,{where: {$and:[{lesson:req.body.lesson},{cohort_name:loginUser().cohort}]}}).
	then(function(result){
		console.log("inside put");
		console.log(result);
		res.redirect('/classes/recording?lesson='+req.body.lesson+'+'+'instructor1='+req.body.instructor1+'+'+'instructor2='+req.body.instructor2+'+'+'recording1='+req.body.recording1+'+'+'recording2='+req.body.recording2);
	});
});


// right padding s with c to a total of n chars
function padding_right(s, c, n) {
  if (! s || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}


function nullToEmtyString(obj){
	for (var key in obj){
		if(!obj[key] === 'null'){
			obj[key]= '';
		}
	}
	return obj;
}

// creates the markup string
function generateMarkup(rows,cohort){

	cohort = nullToEmtyString(cohort);

	var markup='';

	markup += '--------------------------------------------\n\n';
	markup += '# '+cohort.cohort_title+'\n\n';

	markup += '#### '+moment(cohort.start_date,'YYYY-MM-DD').format('MMMM')+' '+moment(cohort.start_date,'YYYY-MM-DD').format('YYYY')+' '+cohort.campus+' - Cohort Curriculum Syllabus\n\n';

	markup += '--------------------------------------------\n\n';
	

	markup += '## Supplemental Content\n\n';

	markup += '[In-class Activities / Homework Solutions]('+cohort.suppl_content_link+')\n\n';
	

	markup += '-----------------------------------------\n\n';
	
	markup += '## Minimum Requirements\n\n';

	markup += '#### Homework\n\n';

	markup += 'You must complete **90%** of the homework assignments. (You can miss **no more** than **2 assignments**.)\n\n';
	
	markup += 'Homework submissions **must be on time AS IS**. Late submissions will not be counted.\n\n';
	
	markup += '#### Attendance\n\n';

	markup += 'Attendance must be maintained at a **95%** rate. (You can miss **no more** than a total of **4 classes**.)\n\n';
	
	markup += 'Written permission must be obtained to miss class or it\'s considered one of your 4 absences.\n\n';
	
	markup += '#### Projects\n\n';

	markup += 'You must give a full effort on every group and individual project.\n\n';

	markup += '-----------------------------------------\n\n';

	markup += '## Important Links And Notes \n\n';
	
	markup += '[Slack Room (UPDATE)]\('+cohort.slack_link+')\n\n';
	
	markup += '[Absence Request Form (UPDATE)]\('+cohort.absence_link+')\n\n';
	
	markup += '[Student x Student Tutoring Form (UPDATE)]\('+cohort.tutoring_link+')\n\n';
	
	markup += '[Weekly Student Feedback Form (UPDATE)]('+ cohort.feedback_link+')\n\n';
	
	markup += '[Homework Submission]('+cohort.hw_submission_link +')\n\n';
	
	markup += 'Live Office Hours: 45 minutes before class and 30 minutes after class\n\n';
	
	markup += '-----------------------------------------\n\n';
	
	markup += '## Curriculum By Week \n\n';
	
	markup += '##### The material covered in this syllabus is subject to change. Our academic team adjusts to the market rapidly.\n';
	
	markup += '| Subject                                                                                     | Lesson # | Date<br>M/W/S             | Date<br>T/T/S             | Recordings               |\n';
	
	markup += '| ------------------------------------------------------------------------------------------- | -------: | ------------------------: | ------------------------: | :----------------------: |\n';
	

	rows.forEach(function(row){

		

		markup += '| '+ padding_right(row.subject,' ', 91);
		markup += ' | '+ padding_right(row.lesson,' ', 8);
		
		markup += ' | '+ padding_right(moment(row.date1,'YYYY-MM-DD').format('ddd')+'<br>'+moment(row.date1,'YYYY-MM-DD').format('LL'),' ',30);
		markup += ' | '+ padding_right(moment(row.date1,'YYYY-MM-DD').format('ddd')+'<br>'+moment(row.date1,'YYYY-MM-DD').format('LL'),' ',30);
		markup += ' | '+ padding_right('['+ row.instructor1 + ']\('+row.recording1+')<br>['+row.instructor2+']\('+row.recording2+')' ,' ', 24);
		markup += ' |';
		markup += '\n';
	});

	
	console.log(rows);
	return markup;
}


module.exports = router;