const developmentLogger = require('./developmentLogger');
const productionLogger = require('./productionLogger');

require('dotenv').config();

let logger = null;
console.log(process.env.NODE_ENV,"environment");

if (process.env.NODE_ENV == "production") {
    logger = productionLogger();
}
else{
   logger = developmentLogger();
}

module.exports = logger;
