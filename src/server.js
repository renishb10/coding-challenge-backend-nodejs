// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const volleyball = require('volleyball');
const cors = require('cors');
const Sentry = require('@sentry/node');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Custom dependencies
const config = require('./server/config');
const logger = require('./server/helpers/logger');
const errorHandler = require('./server/middlewares/errorHandler');
const routes = require('./server/routes');
const mySequelize = require('./server/data/db');

// Express app initiate
const app = express();

// Logging assigned globally
global.logger = logger;

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// Default middlewares
app.use(helmet()); // Adds security headers
app.use(volleyball); // Logs http req/res
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routing middlewares
// Launch page (Static)
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(express.static('public'));

// Swagger Documentation
app.use(
  '/api-doc',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

// Coding Challenge Documentation
app.get('/doc', (req, res) => {
  var file = __dirname + '/berlin_stolen_bikes.pdf';
  res.download(file);
});

// To relevant routes
app.use(`${config.base_url_path.v1}cases`, routes.cases);
app.use(`${config.base_url_path.v1}police`, routes.police);
app.use(`${config.base_url_path.v1}statuses`, routes.statuses);

// Error middleware
app.use(errorHandler);

// Initiate DB and run the server
mySequelize
  .sync({
    // Be cautious, setting true will clean up your db
    force: false,
  })
  .then(() => {
    app.listen(process.env.PORT || config.port, () => {
      logger.info(`Listening on port ${process.env.PORT || config.port}`);
    });
  })
  .catch(e => {
    logger.error(e.message);
  });

// Exporting it for Chai test
module.exports = app;
