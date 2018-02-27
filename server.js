//require the express package
const express = require('express');
const fs = require('fs');
//creates an  express app
const hbs = require('hbs');
//enable heroku to set port
const port = process.env.PORT || 3000; 

var app = express();
//sets view
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);


  fs.appendFile('server.log', log + '\n', err => 
  {
    if(err)
    {
      console.log('Unable to append to server.log');
    }
  })
  next();
});

// app.use((req, res) =>
// {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partials')
//handles the home route
app.get('/', (req,res) =>{
	res.render('home.hbs', {
		pageTitle: 'Home',
  	currentYear: new Date().getFullYear(),
		welcomeMsg: 'Hey Badass Node developer!'
	});
	});
app.get('/bad', (req,res)=>
{
  res.send({
  	errorMessage: 'Page cannot be displayed'
  });
});
app.get('/about', (req,res)=>
{
  res.render('about.hbs', { 
  	pageTitle: 'About Page',
  	currentYear: new Date().getFullYear()
  });
});
app.get('/projects', (req, res)=> 
  {
   res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    currentYear: new Date().getFullYear()
   });
  });
//app is bound to a port on the system
app.listen(port , ()=> {
	console.log('Server is up and running');
});