const { checkIfFileExists } = require('../services/fileUtilites/checkForExistence.services');
const { readData } = require('../services/fileUtilites/read.services');
const sourceFile = process.env.FILE;

const { fetchARecord } = require('../services/fileUtilites/fetch.services');

/**
 * Lists a particular Buddy by its ID
 * @param {*} req Request from client
 * @param {*} res Response from client
 */
exports.listBuddyByID = async (req, res) => {
    //File not found
    if (!checkIfFileExists(sourceFile)) {
        res.status(404).send("File not found");
    }
    else {
        data = await readData(sourceFile);

        //to provide with right content-type in response header- res.json or res.send is conditionalised
        if (data.status == 200) {
            buddyData = await fetchARecord(data.message ,req.params.id);
            res.status(data.status).send(buddyData);
        }
        else
            res.status(data.status).send(data.message);
    }
}

/**
 * Lists all Buddies
 * @param {*} req Request from client
 * @param {*} res Response from client
 */
exports.listAllBuddy = async (req, res) => {
    //File not found
    if (!checkIfFileExists(sourceFile)) {
        res.status(404).send("File not found");
    }
    else {
        data = await readData(sourceFile);

        //to provide with right content-type in response header
        if (data.status == 200)
            res.status(data.status).json(JSON.parse(data.message));
        else
            res.status(data.status).send(data.message);
    }

}
