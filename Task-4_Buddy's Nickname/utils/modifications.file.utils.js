const { writeData } = require('./file.utils');

/**
 * Checks is a record is present in a source JSON string
 * @param {string} content - sourceContent
 * @param {string} id - empId
 * @returns {object} {status , message}
 */
const checkIfRecordExistsById = async (content, id) => {
    allRecords = JSON.parse(content);
    if (allRecords.some((record) => { return (record.empId == id) }))
        return { status: 200, message: "Buddy Found" };
    else
        return { status: 404, message: "Buddy Not Found" };

}


/**
 * Fetches a particular record
 * @param {string} content - fileContent
 * @param {string} index - id to be fetched
 * @returns {json or boolean} record 
 */
const fetchARecord = async (content, index) => {
    allBuddyData = JSON.parse(content);

    status = 200;
    message = false;
    message = allBuddyData.find((record) => { return record.empId == index });

    if (!message) {
        status = 404;
        message = "Buddy not found !";
    }

    return { status, message };
}

/**
 * Alters a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {object} toBeModifiedContent - toBeModifiedJSON
 * @returns {object} responseObject of write.services.js
 */
const alterARecord = async (file, sourceContent, toBeModifiedContent) => {

    content = JSON.parse(sourceContent);

    const editedContent = content.map(record => {
        if (record.empId == toBeModifiedContent.empId) {
            return toBeModifiedContent;
        }
        return record;
    });

    data = await writeData(file, editedContent);
    return data;
}

/**
 * Deletes a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {string} id - id of the record to be deleted
 * @returns {object} responseObject of write.services.js
 */
const deleteARecord = async (file, sourceContent, id) => {

    content = JSON.parse(sourceContent);

    content = content.filter((record) => { return (record.empId != id) });
    data = await writeData(file, content);

    return data;
}

module.exports = { checkIfRecordExistsById, fetchARecord, alterARecord, deleteARecord };