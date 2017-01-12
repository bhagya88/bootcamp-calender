// get all dependencies
var express = require('express');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOveride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var exphbs =require('express-handlebars');
var path = require('path');
var loginUser = require('./login_user');
var logger = require('morgan');
var usersRoute = require('./routes/usersRoute.js');
var adminRoute = require('./routes/adminRoute.js');
var classesRoute = require('./routes/classesRoute.js');
var models  = require('./models');
var sequelizeConnection = models.sequelize;




var GITHUB_CLIENT_ID; 
var GITHUB_CLIENT_SECRET; 
var URL = "";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



if (process.env.NODE_ENV == "production") {
  URL = "https://bc-cal.herokuapp.com";
  GITHUB_CLIENT_ID = "32b88b8ce0cee885748e";
  GITHUB_CLIENT_SECRET = "c5319f5530fe5e8d0ae85764c3e637918cc2f986";
} else {
  URL = "http://127.0.0.1:3000";
  GITHUB_CLIENT_ID = "4ec4c231d857c30d7b06";
  GITHUB_CLIENT_SECRET = "5c68545e36e9325e934703155957b14c445b6442";
}

// Use the GitHubStrategy within Passport.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: URL + "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // the user's GitHub profile is returned to
      // represent the logged-in user.  
      return done(null, profile);
    });
  }
));


sequelizeConnection.sync();

// configure Express
var app = express();


app.set('views', __dirname + '/views');


// register handlebars

app.engine('handlebars',exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(partials());

app.use(logger('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// override with POST having ?_method
app.use(methodOveride('_method'));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));



app.get('/calender', ensureAuthenticated, function(req, res){
  

// disabling authentication from users table to find the cohort_name 

  // models.User.findOne({where:{github_username:req.user.username}
  //                 })
  // .then(function(user){

  //   if(user && (user.role === 'instructor' || user.role === 'ta') ){

  //     loginUser({
  //       name: user.github_username,
  //       cohort: user.cohort_name,
  //       role:user.role
  //       });

  //     console.log(loginUser());


  //    res.sendFile(path.join(__dirname,'views','html','calender.html'));
    

  //   }else if(user && (user.role === 'admin')){

  //     loginUser({
  //       name: user.github_username,
  //       role:user.role
  //       });

  //     console.log(loginUser());


  //    res.sendFile(path.join(__dirname,'views','html','admin.html'));


  //   }else{
  //     res.send("Sorry. You are not a authorised user. Please contact Administrator.")
  //   }

    
      
  //});


  // this code can replaced with the above commented code later

  loginUser({
        name: 'guest',
        cohort: 'UTJAN252017',
        role:'instructor'
        });
  res.sendFile(path.join(__dirname,'views','html','calender.html'));

});


app.use('/users',usersRoute);
app.use('/classes',classesRoute);
app.use('/admin',adminRoute);

// GET /auth/github
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    //console.log('/auth/github');
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });


// GET /auth/github/callback
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    //console.log('/auth/github/callback');
    res.redirect('/calender');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port);


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
