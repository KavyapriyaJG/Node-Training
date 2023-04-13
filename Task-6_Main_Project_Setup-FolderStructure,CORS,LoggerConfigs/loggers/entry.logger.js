require('dotenv').config();
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const file = process.env.USERS_LOGIN_LOG_FILE;

const entryLogger = () => {
    const entryFormat = printf((log) => {
        return `${log.timestamp} : ${log.level} --> ${log.message}`;
      });
    
    return createLogger({
        level: process.env.ENTRY_LOGGER_LEVEL,
        format: combine(
            timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
            entryFormat
          ),
    
        transports: [
            new transports.File({
                filename: file,
            })
        ],
      });
}
module.exports = { entryLogger };