// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');

// Custom dependencies
const config = require('./server/config');
const routes = require('./server/routes');
const mySequelize = require('./server/data/db');

// Express app initiate
const app = express();

// Default middlewares
app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing middlewares
app.use('/', routes.index);
app.use(`${config.base_url_path.v1}cases`, routes.cases);
app.use(`${config.base_url_path.v1}polices`, routes.polices);

// Initiate DB stuffs and run the server
mySequelize
  .sync({
    force: true,
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
