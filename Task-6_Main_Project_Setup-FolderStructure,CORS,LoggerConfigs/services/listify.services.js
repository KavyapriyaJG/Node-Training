const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpActionRestrictedResponse, httpUnauthorisedAccessDeniedResponse } = require('../utils/httpResponses');
const { readData } = require('../utils/file.utils');
const { checkIfRecordExistsById, insertARecord, fetchARecord } = require('../utils/modifications.file.utils');
const { createEntryInTaskListService } = require('./tasks.services');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = process.env.SALT_ROUNDS;

// encrypt password
async function hashPassword(plaintextPassword) {
    const hash = bcrypt.hash(plaintextPassword, +saltRounds);
    return hash;
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

/**
 * Creates a new User
 * @param {string} usersFile - UsersFile's filepath
 * @param {object} user - {emailId, username, password}
 * @returns {object} content - {status, message, data}
 */
const signUpService = async (usersFile, user) => {
    content = await readData(usersFile);
    //if File read successful or File has no records
    if (content.status == 200 || (content.status == 404 && content.message == "File has no Records")) {
        //Set 'no records' message to empty array
        if ((content.status == 404 && content.message == "File has no Records")) content.data = "[]";
        recordFound = await checkIfRecordExistsById(content.data, "emailId", user.emailId);
        //File read successful and a record matches the record to be added 
        if ((content.status == 404 && content.message == "File has no Records") || recordFound.status == 404) {
            let hashedPassword = await hashPassword(user.password);
            let hashedUser = {
                emailId: user.emailId,
                username: user.username,
                password: hashedPassword
            };
            content = await insertARecord(usersFile, content.data, hashedUser);

            if (content.status == 200) {
                //creating record in taskslist.json for the new user
                content = await createEntryInTaskListService(user.emailId);
                if (content.status == 200) content = httpSuccessResponse(success.SUCCESSFUL_USER_SIGNUP, "");
            }
        }
        //record found
        else content = httpActionRestrictedResponse(failure.USER_ALREADY_PRESENT, "");
    }
    return content;
}


/**
 * Logs in a User, Gives them a JWT Bearer token
 * @param {string} usersFile - UsersFile's filepath
 * @param {object} user - {emailId, username, password}
 * @returns {object} content - {status, message, data}
 */
const loginService = async (usersFile, user) => {
    content = await readData(usersFile);
    // File read successful
    if (content.status == 200) content = await fetchARecord(content.data, "emailId", user.emailId);
    // User Found
    if (content.status == 200) {
        //Password checked
        found = await comparePassword(user.password, (content.data).password);
        if (found) {
            content = httpSuccessResponse(success.SUCCESSFUL_USER_LOGIN, user);
        }
        else {
            content = httpUnauthorisedAccessDeniedResponse(failure.UNAUTHORISED_ACCESS, "");
        }
    }
    //User Not Found
    else {
        content = httpUnauthorisedAccessDeniedResponse(failure.USER_NOT_FOUND, "");
    }
    return content;
}


module.exports = { signUpService, loginService };