const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const productionLogger = () => {
    return createLogger({
      level: process.env.LOGGER_LEVEL,
        format: combine(
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            json()
          ),
        transports: [
            new transports.File({
                filename: 'errors_production.log',
            })
        ],
      });
}

  module.exports = productionLogger;