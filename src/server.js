// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const volleyball = require('volleyball');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Custom dependencies
const config = require('./server/config');
const routes = require('./server/routes');
const mySequelize = require('./server/data/db');

// Express app initiate
const app = express();

// Default middlewares
app.use(helmet()); // Adds security headers
app.use(volleyball); // Logs http req/res
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routing middlewares
app.use('/', routes.index);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use(`${config.base_url_path.v1}cases`, routes.cases);
app.use(`${config.base_url_path.v1}polices`, routes.polices);

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.status)
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err,
  });
});

// Initiate DB stuffs and run the server
mySequelize
  .sync({
    // force: true,
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

// Exporting it for Chai test
module.exports = app;
