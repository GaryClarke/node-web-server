const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();

    var logString = `${now}: ${req.method} ${req.url}`;

    console.log(logString);

    fs.appendFile('server.log', logString  + '\n', (err) => {

        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//
//     res.render('maintenance.hbs', {})
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {

    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {

    return text.toUpperCase();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Welcome',
        welcomeMessage: 'Welcome to our page',
    })
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'Bad shit happened'
    });
});

app.listen(3000, () => {

    console.log('Server is up on port 3000')
});