const { readFile } = require('fs');
/**
 * Reads a file and returns respective status code and message
 * @param {*} file 
 * @returns {object} {Status code, If file has content->returns content || If file has no content->return "no content" || If file is not allowed to be read->returns "Error in reading file"  }
 */
const readData = async (file) => {
    return new Promise((resolve, reject) => {
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
                        status: 403,
                        message: "File has no Buddies!.."
                    });
                else
                    resolve({
                        status: 200,
                        message: data
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


module.exports = { readData };