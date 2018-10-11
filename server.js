const express = require('express');

var app = express();

app.get('/', (req, res) => {

    // res.send('<h1>Working!</h1>');
    res.send({
        name: 'Gary',
        likes: [
            'This', 'That', 'Other',
        ]
    })
});

app.get('/about', (req, res) => {

    res.send('About Page');
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'Bad shit happened'
    });
});

app.listen(3000);