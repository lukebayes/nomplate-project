const express = require('express');
// NOTE: nomplate/express is required independently in order to avoid
// polluting the client binary with functionality that is only relevant
// on the server.
const nomplateExpress = require('nomplate/express');
const path = require('path');

const app = express();

// Configure static files from dist
app.use('/dist', express.static('dist'));
app.use('/static', express.static('static'));

// Configure Nomplate
app.engine('.js', nomplateExpress);
app.set('view engine', 'js');
// Configure the default layout (/views/layout.js)
app.set('view options', {layout: 'layout', pretty: process.env.NODE_ENV !== 'production'});
app.set('views', path.resolve(__dirname + '/views'));

// Create a route and return a named template at /views/app.js
app.get('/', (req, res) => {
  res.render('app');
});

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});
