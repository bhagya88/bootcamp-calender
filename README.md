# Bootcamp Calender

### Overview
This is a full stack application developed for The coding Bootcamp at UT Austin. Each cohort runs for about 24 weeks and has about 75 lessons. The lessons are stored in the database which need to be scheduled when a cohort starts and reschdeuled if needed after tne cohort starts. This application provides a drag and drop calender interface to schedule the classes stored in the database. The user also has the option to generate a markdown of the schdeule to be used in the readme.md file on the github repository. 

### Demo
[Check to see the demo]()

### Technologies used
* Server - Node.js, Express framework
* Database - MySql, Sequelize ORM
* Client - FullCalender.io, JQuery, Javascript, HTML5, CSS3
* Npm modules used - express, mysql, express-handlebars, body-parser, path, method-overide, morgan
* APIs / Libraries used - Google calender API , Full Calender.io
* Authentication - Passport Github Strategy

### Design
MVC design pattern and Server side rendering are used. 

* Model - Models are created using Sequelize ORM.

* Views- Views are created using FullCalender.io, JQuery, Javascript, HTML5, CSS3

* Controller - Requests coming to the server are handled by the router which in turn communicates with model to get data and passes it to the views. 

### Challenges faced

* How to get the full calender working?
* How to pull events from google calender?
* How to get events stored in the database onto full calender?

### Solutions found

* Reading the documentation several times and looking at code samples helped understanding Full Calender.io.
* Finding the link for public holidays from Google Calender API and calling it using Full Calender library function helped solve the the problem.
* Writing API route for the events and seperating scheduled and unschdeduled events and passing them onto Full Calender functions worked.


#### Developed by Bhagya and Chin Long