const { deleteBuddyService } = require('../services/deleteBuddy.services');
const sourceFile = process.env.FILE;

/**
 * Deletes a particular Buddy by its ID
 * @param {*} req - Request from the client
 * @param {*} res - Response to the client
 */
exports.deleteBuddy = async (req, res) => {

    data = await deleteBuddyService(sourceFile, req.params.id);

    res.status(data.status).send(data.message);

}