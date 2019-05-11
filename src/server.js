// Application entry point

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
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
app.use('/', routes.index);
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);
app.use(`${config.base_url_path.v1}cases`, routes.cases);
app.use(`${config.base_url_path.v1}polices`, routes.polices);
app.use(`${config.base_url_path.v1}statuses`, routes.statuses);

// Error middleware
app.use(errorHandler);

// Initiate DB and run the server
mySequelize
  .sync({
    force: true,
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
