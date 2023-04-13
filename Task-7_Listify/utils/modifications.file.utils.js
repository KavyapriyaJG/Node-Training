const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpNotFoundResponse } = require('../utils/httpResponses');
const { writeData } = require('./file.utils');

/**
 * Checks is a record is present in a source JSON string
 * @param {string} content - sourceContent
 * @param {string} parameterToCheck - parameter to check
 * @param {string} id - emailId
 * @returns {object} {status , message, data }
 */
const checkIfRecordExistsById = (content, parameterToCheck, id) => {
    allRecords = JSON.parse(content);
    if (allRecords.some((record) => { return (record[parameterToCheck] == id) })) {
        return httpSuccessResponse(success.RECORD_FOUND, "");
    }
    else
        return httpNotFoundResponse(failure.RECORD_NOT_FOUND, "");

}

/**
 * Inserts a record into the JSON array and pushes it to the file
 * @param {string} file - source file
 * @param {string} fileContent - contents of the source file
 * @param {object} recordToBeInserted 
 * @returns {object} info - { status, message, data }
 */
const insertARecord = async (file, fileContent, recordToBeInserted) => {
    allRecords = JSON.parse(fileContent);
    allRecords.push(recordToBeInserted);
    info = await writeData(file, allRecords);
    return info;
}

/**
 * Fetches a particular record
 * @param {string} content - fileContent
 * @param {string} parameterToCheck - parameter to check
 * @param {string} index - id to be fetched
 * @returns {object} {status , message, data }
 */
const fetchARecord = async (content, parameterToCheck, index) => {
    allBuddyData = JSON.parse(content);
    data = false;
    data = allBuddyData.find((record) => { return record[parameterToCheck] == index });
    if (!data) return httpNotFoundResponse(failure.RECORD_NOT_FOUND, "");
    else return httpSuccessResponse("", data);
}

/**
 * Alters a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {object} toBeModifiedContent - toBeModifiedJSON
 * @returns {object} data - { status , message, data }
 */
const alterARecord = async (file, sourceContent, toBeModifiedContent) => {
    content = JSON.parse(sourceContent);
    const editedContent = content.map(record => {
        if (record.emailId == toBeModifiedContent.emailId) {
            return toBeModifiedContent;
        }
        return record;
    });
    content = await writeData(file, editedContent);
    return content;
}

/**
 * Deletes a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {string} id - id of the record to be deleted
 * @returns {object} responseObject of file.utils.js
 */
const deleteARecord = async (file, sourceContent, id) => {
    content = JSON.parse(sourceContent);
    content = content.filter((record) => { return (record.emailId != id) });
    data = await writeData(file, content);
    return data;
}

module.exports = { checkIfRecordExistsById, insertARecord, fetchARecord, alterARecord, deleteARecord };