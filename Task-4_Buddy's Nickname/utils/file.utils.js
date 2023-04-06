const { readFile, existsSync, writeFile} = require('fs');
/**
 * Reads a file and returns respective status code and message
 * @param {string} file 
 * @returns {object} {Status code, If file has content->returns content || If file has no content->return "no content" || If file is not allowed to be read->returns "Error in reading file"  }
 */
const readData = async (file) => {
    return new Promise((resolve, reject) => {
        if(checkIfFileExists(file)){
            readFile(file, 'UTF-8', (err, data) => {
                if (err) {
                    console.log("File can't be opened");
                    reject({
                        status: 403,
                        message: "Read permission denied"
                    });
                }
                else {
                    let buddies = JSON.parse(data);
                    if (buddies.length == 0)
                        reject({
                            status: 404,
                            message: "File has no Buddies"
                        });
                    else
                        resolve({
                            status: 200,
                            message: data
                        });
                }

            });
        }
        else{
            reject({
                status: 404,
                message: "File not found!.."
            });
        }
    }).then(
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
                reject({
                    status: 403,
                    message: "Permission denied for writting to the file"
                });
            } else {
                resolve({
                    status: 200,
                    message: "File modified successfully"
                });
            }
        });
    }).then(
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