const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

require('dotenv').config();

const developmentLogger = () => {
    const devFormat = printf((log) => {
        return `${log.timestamp} : ${log.level} --> ${log.message}`;
      });
    
    return createLogger({
        level: process.env.LOGGER_LEVEL,
        format: combine(
            label({ label: 'DevEnv' }),
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            devFormat
          ),
    
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'errors.log',
            })
        ],
      });
}

module.exports =  developmentLogger;