const { readData , writeData } = require('../utils/file.utils');
const { checkIfRecordExistsById, fetchARecord, alterARecord, deleteARecord } = require('../utils/modifications.file.utils');

/**
 * ChecksFile-> Writes a new Record
 * @param {string} file - sourceFile
 * @param {object} content - contentToBeAdded
 * @returns {object} data - {status, message} 
 */
const createBuddyService = async (file, content) => {
    data = await readData(file);
    //if File read successful or File has no buddies
    if (data.status == 200 || ( data.status == 404 && data.message =="File has no Buddies")) {
        //Set 'no buddies' message to empty array
        if (( data.status == 404 && data.message =="File has no Buddies")) data.message = "[]";
        recordFound = await checkIfRecordExistsById(data.message, content.empId);

        //File read successful and a buddy matches the buddy to be added 
        if ( ( data.status == 404 && data.message =="File has no Buddies") || recordFound.status == 404) {

            fileContent = JSON.parse(data.message);
            fileContent.push(content);
            data = await writeData(file,fileContent);

            if (data.status == 200)  data.message = "Buddy added to List !";
        }
        //Buddy found
        else {
            data.status = 409;
            data.message = "Buddy Already Present !";
        }
    }
    return data;
}


/**
 * Checks for file-> Reads from file-> Fetches Record
 * @param {string} file - sourceFile
 * @param {string} index - empId of the Buddy
 * @returns {object} data - {status, message} 
 */
const listBuddyByIDService = async (file, index) => {
    data = await readData(file);
    //File read successful
    if (data.status == 200) data = await fetchARecord(data.message, index);
    return data;
}

const listAllBuddiesService = async (file) => {
    data = await readData(file);
    //File read successful
    //to provide with right content-type in response header-> res.json is set
    if (data.status == 200) data.message = JSON.parse(data.message);
    return data;
}



/**
 * ChecksFile -> Read-> Finds Index-> Modifies-> Writes to the sourceFile
 * @param {string} file - sourceFile
 * @param {string} index - req.params.id
 * @param {object} content - contentToBeModified
 * @returns {object} data - {status, message} 
 */
const modifyBuddyService = async (file, index, content) => {
    data = await readData(file);
    //File read successful
    if (data.status == 200) {
        recordFound = await checkIfRecordExistsById(data.message, index);

        //Buddy Found
        if (recordFound.status == 200) {
            data = await alterARecord(file, data.message, content);
            if (data.status == 200) data.message =  "Buddy Info Modified !"
        }
        //Buddy Not found
        else {
            data = recordFound;
        }
    }
    return data;
}


/**
 * ChecksFile-> Reads-> Finds Index-> Deletes the specific record in the file
 * @param {string} file - source file
 * @param {string} index - req.params.id
 * @returns {object} data - {status, message} 
 */
const deleteBuddyService = async (file, index) => {
    data = await readData(file);
    //File read successful
    if(data.status==200){
        recordFound = await checkIfRecordExistsById(data.message, index);

        //Buddy Found
        if (recordFound.status == 200) {
            data = await deleteARecord(file, data.message, index);
            if (data.status == 200) data.message = "Buddy Deleted !";
        }
        //Buddy not Found
        else {
            data = recordFound;
        }
        
    }
    return data;
}

module.exports = { createBuddyService, listBuddyByIDService, listAllBuddiesService, modifyBuddyService, deleteBuddyService };
