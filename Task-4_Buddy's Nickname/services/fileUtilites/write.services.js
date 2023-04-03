const { writeFile } = require('fs');

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
        //for resolve
        (data) => {
            return data;
        }
    ).catch(
        //for reject
        (err) => {
            return err;
        }
    );
}



module.exports = { writeData };