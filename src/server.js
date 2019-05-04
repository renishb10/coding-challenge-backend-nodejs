// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Custom dependencies
const routes = require('./server/routes');

// Express app initiate
const app = express();

// Default middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing middlewares
app.use('/', routes.index);

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
