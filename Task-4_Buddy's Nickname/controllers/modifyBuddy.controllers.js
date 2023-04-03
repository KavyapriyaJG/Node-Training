const {modifyBuddyService} = require('../services/modifyBuddy.services');
const sourceFile = process.env.FILE;

/**
 * Modified a particular Buddy by its ID
 * @param {*} req Request from the client
 * @param {*} res Response to the client
 */
exports.modifyBuddy = async (req, res) => {
    content = {
        "empId": req.params.id,
        "realName": req.body.realName,
        "nickName": req.body.nickName,
        "dob": req.body.dob,
        "hobbies": req.body.hobbies
    }

    data = await modifyBuddyService(sourceFile, req.params.id, content);
    res.status(data.status).send(data.message);
}