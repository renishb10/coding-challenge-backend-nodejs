const { createLogger, format, transports } = require('winston');
const Sentry = require('winston-sentry-log');

const sentryOptions = {
  dsn: 'https://fff4cdd7b0794a34879f988f865e6c99@sentry.io/1452354',
  level: 'error',
};

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.json(),
  ),
  label: 'StolenBike',
  transports: [
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: 'StolenBike Log:',
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `StolenBike Log [${info.timestamp}]: ${info.level} -> ${
              info.message
            }`,
        ),
      ),
    }),
    new Sentry(sentryOptions),
  ],
});

module.exports = logger;
