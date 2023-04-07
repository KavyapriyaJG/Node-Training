const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpActionRestrictedResponse } = require('../utils/httpResponses');
const { readData , writeData } = require('../utils/file.utils');
const { checkIfRecordExistsById, fetchARecord, alterARecord, deleteARecord } = require('../utils/modifications.file.utils');

const logger = require('../logger/logger');

/**
 * ChecksFile-> Writes a new Record
 * @param {string} file - sourceFile
 * @param {object} record - contentToBeAdded
 * @returns {object} data - {status, message} 
 */
const createBuddyService = async (file, record) => {
    content = await readData(file);
    //if File read successful or File has no buddies
    if (content.status == 200 || ( content.status == 404 && content.message =="File has no Buddies")) {
        //Set 'no buddies' message to empty array
        if (( content.status == 404 && content.message =="File has no Buddies")) content.data = "[]";
        recordFound = await checkIfRecordExistsById(content.data, record.empId);

        //File read successful and a buddy matches the buddy to be added 
        if ( ( content.status == 404 && content.message =="File has no Buddies") || recordFound.status == 404) {

            fileContent = JSON.parse(content.data);
            fileContent.push(record);
            content = await writeData(file,fileContent);

            if (content.status == 200)  content = httpSuccessResponse(success.SUCCESSFUL_INSERT,"");
        }
        //Buddy found
        else {
            content = httpActionRestrictedResponse(failure.RECORD_ALREADY_PRESENT,"");
        }
    }
    return content;
}


/**
 * Checks for file-> Reads from file-> Fetches Record
 * @param {string} file - sourceFile
 * @param {string} index - empId of the Buddy
 * @returns {object} content - {status, message} 
 */
const listBuddyByIDService = async (file, index) => {
    content = await readData(file);
    //File read successful
    if (content.status == 200) content = await fetchARecord(content.data, index);
    return content;
}

const listAllBuddiesService = async (file) => {
    content = await readData(file);
    //File read successful
    //to provide with right content-type in response header-> res.json is set
    if (content.status == 200) content.data = JSON.parse(content.data);
    return content;
}



/**
 * ChecksFile -> Read-> Finds Index-> Modifies-> Writes to the sourceFile
 * @param {string} file - sourceFile
 * @param {string} index - req.params.id
 * @param {object} record - contentToBeModified
 * @returns {object} data - {status, message} 
 */
const modifyBuddyService = async (file, index, record) => {
    content = await readData(file);
    //File read successful
    if (content.status == 200) {
        recordFound = await checkIfRecordExistsById(content.data, index);

        //Buddy Found
        if (recordFound.status == 200) {
            content = await alterARecord(file, content.data, record);
            if (content.status == 200)
            { 
                logger.info(`Buddy ${index} Info Modified`);
                content = httpSuccessResponse(success.SUCCESSFUL_MODIFY);
            }
        }
        //Buddy Not found
        else {
            content = recordFound;
        }
    }
    return content;
}


/**
 * ChecksFile-> Reads-> Finds Index-> Deletes the specific record in the file
 * @param {string} file - source file
 * @param {string} index - req.params.id
 * @returns {object} data - {status, message} 
 */
const deleteBuddyService = async (file, index) => {
    content = await readData(file);
    //File read successful
    if(content.status==200){
        recordFound = await checkIfRecordExistsById(content.data, index);

        //Buddy Found
        if (recordFound.status == 200) {
            content = await deleteARecord(file, content.data, index);
            if (content.status == 200){
                logger.info(`Buddy ${index} Deleted`);
                content = httpSuccessResponse(success.SUCCESSFUL_DELETE, content.data);
            }
        }
        //Buddy not Found
        else {
            content = recordFound;
        }
        
    }
    return content;
}

module.exports = { createBuddyService, listBuddyByIDService, listAllBuddiesService, modifyBuddyService, deleteBuddyService };
