const errorHandler = (err, req, res, next) => {
  // TODO: Error displays can be handled based on status or severity.
  // Eg: Only 500s logs & sent to Sentry etc.
  logger.error(`${err.status || 500} | ${err.message}`);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err,
  });
};

module.exports = errorHandler;
