/*
    this is express webapp build by krishna 
    version = 0.0.1
    using diffrent packages and modules and using node as a backend
 */

// packages
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('requests');

const app = express();

//Enviroment variable

const port = process.env.PORT || 8000;
const staticpath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, "../templates/partials");

// dynamic path register
app.set("view engine", "hbs");

// transfer views folder into templates
app.set("views", viewpath);

// adding partial folder
hbs.registerPartials(partials_path);

// adding static file path in webapp
app.use(express.static(staticpath));

//routing
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {;
    res.render('about');
});

app.get('/wether', (req, res) => {
    res.render("wether");
});

app.get('*', (req, res) => {
    res.render("error", {
      error: "404page not found",
    });
});

app.listen(port, () => { });