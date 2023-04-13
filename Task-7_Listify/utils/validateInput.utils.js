const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpInvalidOperationResponse } = require('../utils/httpResponses');

const validateCreateTask = (taskObject) => {
    const { taskId, title, description, priority, dueDate, comments } = taskObject;
    invalidTaskFields = [];
    if (!taskId) invalidTaskFields.push("taskId");
    if (!title) invalidTaskFields.push("title");
    if (!description) invalidTaskFields.push("description");
    if (!priority || (priority !== undefined && (priority != "high" && priority != "medium" && priority != "low"))) invalidTaskFields.push("priority");
    if (!dueDate) invalidTaskFields.push("dueDate");
    if (!comments) invalidTaskFields.push("comments");

    response = httpSuccessResponse(success.VALID_INPUT, "");
    if (invalidTaskFields.length !== 0) {
        message = invalidTaskFields.toString() + " are not valid !";
        response = httpInvalidOperationResponse(message, "");
    }
    return response;
}

const validateModifyTask = (taskObject) => {
    const { title, description, priority, dueDate, comments } = taskObject;
    response = httpSuccessResponse(success.VALID_INPUT, "");
    // validations - only accepted values accepted in modify task service
    if (!title && !description && !priority && !dueDate && !comments) {
        message = "Minimum one field like Title, Description, Priority, dueDate is needed !";
        response = httpInvalidOperationResponse(message, "");
    }
    return response;
}

const validateUser = (userObject, caller) => {
    // Validate only emailId, username and password fields while creating user
    let { emailId, username, password } = userObject;

    const regExName = /^[a-zA-Z]{1,30}$/;
    const regExMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    invalidUserFields = [];
    //Should be Not empty and Valid as per RegEx
    if (!emailId || (emailId !== undefined && !regExMail.test(emailId))) invalidUserFields.push("emailId");
    if (!username || (username !== undefined && !regExName.test(username))) {
        if (caller == "signUp")
            invalidUserFields.push("username");
    }
    if (!password) invalidUserFields.push("password");

    response = httpSuccessResponse(success.VALID_INPUT, "");
    if (invalidUserFields.length !== 0) {
        message = invalidUserFields.toString() + " are not valid !";
        response = httpInvalidOperationResponse(message, "");
    }
    return response;
}

module.exports = { validateCreateTask, validateModifyTask, validateUser };