const { checkIfFileExists } = require('../services/fileUtilites/checkForExistence.services');
const { readData } = require('../services/fileUtilites/read.services');
const { writeData } = require('../services/fileUtilites/write.services');
const sourceFile = process.env.FILE;

/**
 * Creates a new buddy
 * @param {*} req Request from the client
 * @param {*} res Response to the client
 */
exports.createBuddy = async (req, res) => {
    //if no file, create a file
    if (!checkIfFileExists(sourceFile)) {
        await writeData(sourceFile, []);
    }
    data = await readData(sourceFile);

    //if empty file, add an empty array
    if (data.status == 403)
        data.message = "[]";
    allBuddyData = JSON.parse(data.message);

    //to avoid duplication
    found = false;
    allBuddyData.forEach((buddyData) => {
        if (buddyData.empId == req.body.empId) {
            found = true;
            res.status(403).send("Buddy Already Exists");
        }
    }
    );
    if (!found) {
        let buddy = {
            "empId": req.body.empId,
            "realName": req.body.realName,
            "nickName": req.body.nickName,
            "dob": req.body.dob,
            "hobbies": req.body.hobbies

        };
        allBuddyData.push(buddy);

        data = await writeData(sourceFile, allBuddyData);

        if (data.status == 200)
            res.status(data.status).send("Buddy added to List !")
        else
            res.status(data.status).send(data.message);

    }

}