const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const loggerLevel = process.env.LOGGER_LEVEL;
const file = process.env.DEVELOPMENT_LOG_FILE;

const developmentLogger = () => {
    const devFormat = printf((log) => {
        return `${log.timestamp} : ${log.level} --> ${log.message}`;
      });
    
    return createLogger({
        level: loggerLevel,
        format: combine(
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            devFormat
          ),
    
        transports: [
            new transports.Console(),
            new transports.File({
                filename: file,
            })
        ],
      });
}

module.exports =  developmentLogger;