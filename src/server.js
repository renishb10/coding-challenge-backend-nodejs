// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Custom dependencies
const config = require('./server/config');
const routes = require('./server/routes');

// Express app initiate
const app = express();

// Default middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing middlewares
app.use('/', routes.index);
app.use(`${config.base_url_path.v1}cases`, routes.cases);
app.use(`${config.base_url_path.v1}polices`, routes.polices);

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
