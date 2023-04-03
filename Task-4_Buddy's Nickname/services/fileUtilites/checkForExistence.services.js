const fs = require('fs');

/**
 * Checks and returns a boolean indicating existence of the resource
 * @param {string} file 
 * @returns {boolean} Is the requested resource present?
 */
const checkIfFileExists = (file) => {
    return fs.existsSync(file);
}

/**
 * Checks is a record is present in a source JSON string
 * @param {string} content - sourceContent
 * @param {string} id - empId
 * @returns {boolean} found 
 */
const checkIfRecordExistsById = async (content, id) => {
    allRecords = JSON.parse(content);
    
    found=false;
    allRecords.forEach( (record) => {
            if(record.empId == id){
                found = true;
            }
        }
    );
    return found;
}

module.exports = { checkIfFileExists, checkIfRecordExistsById };