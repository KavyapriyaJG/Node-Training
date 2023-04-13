const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpPermissionDeniedResponse, httpNotFoundResponse } = require('../utils/httpResponses');
const { readFile, existsSync, writeFile } = require('fs');

/**
 * Reads a file and returns respective status code and message
 * @param {string} file 
 * @returns {object} {Status code, If file has content->returns content || If file has no content->return "no content" || If file is not allowed to be read->returns "Error in reading file"  }
 */
const readData = async (file) => {
    return new Promise((resolve, reject) => {
        if (checkIfFileExists(file)) {
            readFile(file, 'UTF-8', (err, data) => {
                if (err) {
                    console.log("File can't be opened");
                    reject(
                        httpPermissionDeniedResponse(failure.READ_PERMISSION_DENIED, "")
                    );
                }
                else {
                    let records = JSON.parse(data);
                    if (records.length == 0)
                        reject(
                            httpNotFoundResponse(failure.NO_RECORDS, "")
                        );
                    else
                        resolve(
                            httpSuccessResponse("", data)
                        );
                }

            });
        }
        else {
            reject(
                httpNotFoundResponse(failure.FILE_NOT_FOUND, "")
            );
        }
    })
        .then(
            (data) => {
                return data;
            }
        ).catch(
            (err) => {
                return err;
            }
        );
}


/**
 * Write a record into the file
 * @param {string} file - to be modified
 * @param {object} data - content to be put inside the file
 * @returns {object} {status code, If no write permission to the file->returns "Permission denied" || If changed-> returns "Successful write"}
 */
const writeData = (file, data) => {
    return new Promise((resolve, reject) => {
        writeFile(file, JSON.stringify(data), err => {
            if (err) {
                reject(
                    httpPermissionDeniedResponse(failure.WRITE_PERMISSION_DENIED, "")
                );
            } else {
                resolve(
                    httpSuccessResponse(success.SUCCESSFUL_FILE_MODIFICATION, data)
                );
            }
        });
    })
        .then(
            (data) => {
                return data;
            }
        ).catch(
            (err) => {
                return err;
            }
        );
}


/**
 * Checks and returns a boolean indicating existence of the resource
 * @param {string} file 
 * @returns {boolean} Is the requested resource present?
 */
const checkIfFileExists = (file) => {
    return existsSync(file);
}


module.exports = { readData, writeData, checkIfFileExists };