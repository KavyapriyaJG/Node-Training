const developmentLogger = require('./development.logger');
const productionLogger = require('./production.logger');

require('dotenv').config();

let logger = null;
//for visibility to dev environment
//console.log(process.env.NODE_ENV,"environment");

if (process.env.NODE_ENV == "production") {
    logger = productionLogger();
}
else{
   logger = developmentLogger();
}

module.exports = logger;
