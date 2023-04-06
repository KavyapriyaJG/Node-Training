const { createBuddyService, listBuddyByIDService, listAllBuddiesService, modifyBuddyService, deleteBuddyService } = require('../services/buddy.service');
require('dotenv').config();
const sourceFile = process.env.FILE;

/**
 * Creates a new buddy
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const createBuddy = async (req, res) => {

    data = await createBuddyService(sourceFile, req.body);
    res.status(data.status).send(data.message);

}

/**
 * Lists a particular Buddy by its ID
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const listBuddyByID = async (req, res) => {

    let data = await listBuddyByIDService(sourceFile, req.params.id);
    res.status(data.status).send(data.message);

}

/**
 * Lists all Buddies
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const listAllBuddies = async (req, res) => {

    let data = await listAllBuddiesService(sourceFile);
    res.status(data.status).send(data.message);

}


/**
 * Modified a particular Buddy by its ID
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const modifyBuddy = async (req, res) => {
    let { realName, nickName, dob, hobbies } = req.body;

    content = {
        "empId": req.params.id, realName, nickName, dob, hobbies
    }

    data = await modifyBuddyService(sourceFile, req.params.id, content);
    res.status(data.status).send(data.message);
}

/**
 * Deletes a particular Buddy by its ID
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const deleteBuddy = async (req, res) => {

    data = await deleteBuddyService(sourceFile, req.params.id);
    res.status(data.status).send(data.message);

}

module.exports = { createBuddy, listBuddyByID, listAllBuddies, modifyBuddy, deleteBuddy };