const { createBuddyService, listBuddyByIDService, listAllBuddiesService, modifyBuddyService, deleteBuddyService } = require('../services/buddy.service');
const logger = require('../logger/logger');
const { entryLogger } = require('../logger/entryLogger');
require('dotenv').config();
user = entryLogger();
const sourceFile = process.env.FILE;

/**
 * Creates a new buddy
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const createBuddy = async (req, res) => {
    user.info(` ${req.headers['user-agent']} requested to create Buddy { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
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
    user.info(`${req.headers['user-agent']} requested to Buddy ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl} } }`);

    let data = await listBuddyByIDService(sourceFile, req.params.id);
    if(data.status==404){
        logger.warn(`Buddy not found on "${req.originalUrl}" through ${req.method}`);
    }
    (data.status == 200) ? 
        res.status(data.status).send(data.data) : res.status(data.status).send(data.message);

}

/**
 * Lists all Buddies
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const listAllBuddies = async (req, res) => {
    user.info(`${req.headers['user-agent']} requested to list all buddies { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);

    let data = await listAllBuddiesService(sourceFile);
    (data.status == 200) ? 
        res.status(data.status).send(data.data) : res.status(data.status).send(data.message);

}


/**
 * Modified a particular Buddy by its ID
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const modifyBuddy = async (req, res) => {
    user.info(`${req.headers['user-agent']} requested to modify Buddy ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);

    let { realName, nickName, dob, hobbies } = req.body;

    record = {
        "empId": req.params.id, realName, nickName, dob, hobbies
    }

    content = await modifyBuddyService(sourceFile, req.params.id, record);
    if(content.status==404){
        logger.warn(`Buddy not found on "${req.originalUrl}" through ${req.method}`);
    }
    res.status(content.status).send(content.message);
}

/**
 * Deletes a particular Buddy by its ID
 * @param {Request} req - request from client
 * @param {Response} res - response to client
 * @returns {Response} res - {status, message}
 */
const deleteBuddy = async (req, res) => {

    user.info(`${req.baseUrl} ${req.headers['user-agent']} requested to delete Buddy ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);

    content = await deleteBuddyService(sourceFile, req.params.id);
    if(content.status==404){
        logger.warn(`Buddy not found on "${req.originalUrl}" through ${req.method}`);
    }
    res.status(content.status).send(content.message);

}

module.exports = { createBuddy, listBuddyByID, listAllBuddies, modifyBuddy, deleteBuddy };

//console.log(data, "controller.............................................");