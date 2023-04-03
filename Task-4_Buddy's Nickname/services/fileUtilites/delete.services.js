const {writeData} = require('./write.services');

/**
 * Deletes a record inplace
 * @param {string} file - file subjected for modification
 * @param {string} sourceContent - sourceArray
 * @param {string} id - id of the record to be deleted
 * @returns {object} responseObject of write.services.js
 */
const deleteARecord = async (file, sourceContent, id)=> {

    content = JSON.parse(sourceContent);

    index = content.findIndex((record) => { return (record.empId == id)} );
    // validation if the record exists is done in controller
    content.splice(index, 1) ;
    data = await writeData(file, content);

    //response from fileUtilities/write.service.js
    return data;
}

module.exports = { deleteARecord };