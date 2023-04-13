const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const file = process.env.PRODUCTION_LOG_FILE;
const loggerLevel = process.env.LOGGER_LEVEL;

const productionLogger = () => {
    return createLogger({
      level: loggerLevel,
        format: combine(
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            json()
          ),
        transports: [
            new transports.File({
                filename: file,
            })
        ],
      });
}

  module.exports = productionLogger;