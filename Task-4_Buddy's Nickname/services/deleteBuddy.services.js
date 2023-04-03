const { checkIfFileExists, checkIfRecordExistsById } = require('./fileUtilites/checkForExistence.services');
const { readData } = require('./fileUtilites/read.services');
const { deleteARecord } = require('./fileUtilites/delete.services');

/**
 * ChecksFile-> Reads-> Finds Index-> Deletes the specific record in the file
 * @param {string} file - source file
 * @param {string} index - req.params.id
 */
const deleteBuddyService = async (file, index) => {
    response = {
        "status": 200,
        "message": "accepted"
    }
    //File not found
    if (!checkIfFileExists(file)) {
        //return error from fileUtilities/checksForExistence.js
        response.status = 404;
        response.message = "File not found"
    }
    else {
        data = await readData(file);
        if (data.status == 403){
            //return error from fileUtilities/read.services.js
            response.status = data.status;
            response.message = data.message;
        }
        else {
            found = await checkIfRecordExistsById(data.message, index);

            if (found) {
                data = await deleteARecord(file, data.message, index);

                if (data.status == 200) {
                    //Delete Buddy Successful
                    response.message = "Buddy Deleted !";
                }
                else {
                    //return error from fileUtilities/delete.service.js
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
    }
    return response;
}

module.exports = { deleteBuddyService };