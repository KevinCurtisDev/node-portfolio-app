const express = require('express');
const { projects } = require('./data.json')

const app = express();

// set pug as the templating engine
app.set('view engine', 'pug');
//serve images, css, and js througha static route
app.use('/static', express.static('public'))

//get the home page and add the projects variable to be used in index.pug
app.get('/', (req, res) => {
    res.render('index', {projects: projects});
});

//get the about page
app.get('/about', (req, res) => {
    res.render('about');
});

//get individual project pages based on id in the url
app.get('/project/:id', (req, res) => {
    res.render('project', {projects: projects[req.params.id]});
});

//set up custom 404 error message
app.use((req, res, next) => {
    const err = new Error("Uh oh... Seems like this page doesn't exist");
    err.status = 404;
    //log friendly error message to the console
    console.error("Error: 404\n This page doesn't seem to exist")
    next(err);
});

//set up the custom error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

//serve the site on localhost 3000
app.listen(3000);