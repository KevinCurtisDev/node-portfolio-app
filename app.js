const express = require('express');
const { projects } = require('./data.json')

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {projects: projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    res.render('project', {projects: projects[req.params.id]});
});

app.get('/layout', (req, res) => {
    res.render('layout');
});

app.get('/error', (req, res) => {
    res.render('error');
});

app.use((req, res, next) => {
    const err = new Error("Uh oh... Seems like this page doesn't exist");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000);