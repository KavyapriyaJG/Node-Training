const {writeData} = require('./write.services');

/**
 * Alters a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {object} toBeModifiedContent - toBeModifiedJSON
 * @returns {object} responseObject of write.services.js
 */
const alterARecord = async (file, sourceContent, toBeModifiedContent)=>{

    content = JSON.parse(sourceContent);

    content[content.findIndex((record) => 
        { return (record.empId == toBeModifiedContent.empId)} )] = toBeModifiedContent;

    data = await writeData(file, content);

    //return from fileUtilities/write.service.js
    return data;
}

module.exports = { alterARecord };