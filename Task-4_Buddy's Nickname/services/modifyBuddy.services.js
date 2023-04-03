const { checkIfFileExists, checkIfRecordExistsById } = require('./fileUtilites/checkForExistence.services');
const { readData } = require('./fileUtilites/read.services');
const { alterARecord } = require('./fileUtilites/alter.services');

/**
 * ChecksFile -> Readd-> Finds Index-> Modifies-> Writes to the sourceFile
 * @param {string} file - sourceFile
 * @param {string} index - req.params.id
 * @param {object} content - contentToBeModified
 */
const modifyBuddyService = async (file, index, content) => {
    response = {
        "status": 200,
        "message": "accepted"
    };
    //File not found
    if (!checkIfFileExists(file)) {
        //return error from fileUtilities/checksForExistence.js
        response.status = 400;
        response.message = "File not found";
    }
    data = await readData(file);

    if (data.status == 403) {
        //return error from fileUtilities/read.services.js
        response.status = data.status;
        response.message = data.message;
    }
    else {
        found = await checkIfRecordExistsById(data.message, index);

        if (found) {
            data = await alterARecord(file, data.message, content);

            if (data.status == 200) {
                //Modify Buddy successful
                response.status = data.status;
                response.message = "Buddy Info Modified !"

            }
            else {
                //return error from fileUtilities/alter.service.js
                response.status = data.status;
                response.message = data.message;
            }
        }
        else {
            //Buddy not found
            response.status = 404;
            response.message = "Buddy Not Found. Try entering exact EmpId..";
        }
    }

    return response;

}

module.exports = { modifyBuddyService }; 