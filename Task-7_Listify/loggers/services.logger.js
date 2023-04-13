require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const file = process.env.SERVICES_LOG_FILE;

const servicesLogger = () => {
    const servicesFormat = printf((log) => {
        return `${log.timestamp} : ${log.level} --> ${log.message}`;
      });
    
    return createLogger({
        level: process.env.LOGGER_LEVEL,
        format: combine(
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            servicesFormat
          ),
    
        transports: [
            new transports.File({
                filename: file,
            })
        ],
      });
}
module.exports = { servicesLogger };