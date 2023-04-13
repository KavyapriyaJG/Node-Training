const { success, failure } = require('../utils/CONSTANTS');
const { httpSuccessResponse, httpInvalidOperationResponse, httpActionRestrictedResponse, httpNotFoundResponse } = require('../utils/httpResponses');
const { readData } = require('../utils/file.utils');
const { insertARecord, fetchARecord, alterARecord } = require('../utils/modifications.file.utils');
const { getValue } = require('../utils/helper.tasks.utils');
require('dotenv').config();
const file = process.env.TASKS_LIST_FILE;

/**
 * Lists All Tasks
 * @param {string} emailId - emailId of the user
 * @returns {object} content - {status, message, data}
 */
const listAllTasksService = async (emailId) => {
    content = await readData(file);
    // File read successful
    if (content.status == 200) content = await fetchARecord(content.data, "emailId", emailId);
    // User Fetch from taskLists file successful
    if (content.status == 200) content.data = content.data.tasks;
    return content;
}


/**
 * List a Task by its Id
 * @param {string} emailId 
 * @param {string} taskId 
 * @returns {object} content - {status, message, data}
 */
const listTaskByIdService = async (emailId, taskId) => {
    content = await listAllTasksService(emailId);
    // Tasks fetched successfully
    if (content.status == 200) {
        content = await fetchARecord(JSON.stringify(content.data), "taskId", taskId);
        // Task fetch sucessful
        if (content.status == 200) content = httpSuccessResponse(success.TASK_RECORD_FOUND, content.data);
        else content = httpNotFoundResponse(failure.TASK_RECORD_NOT_FOUND, "");
    }
    return content;
}


/**
 * Creates a new Task
 * Process : Get a Task by taskId->  Read tasksList.json -> Find the user object -> 
 *        (check if the task exist already ->fetch tasks, push new task ) -> Alter the userObject in place
 * @param {string} emailId 
 * @param {object} record - task passed in req.body
 * @returns {object} content - { status, message, data }
 */
const createTaskService = async (emailId, record) => {
    taskFound = await listTaskByIdService(emailId, record.taskId);
    if (taskFound.status == 404) {
        // Get the all userObjects from tasksList.json for writing to taskLists file
        fileContent = await readData(file);
        if (fileContent.status == 200) {
            // Get the users's object from tasksList.json
            content = await fetchARecord(fileContent.data, "emailId", emailId);
            if (content.status == 200) {
                // Set Local IST dateAndTime string to createdDate
                record.createdDate = new Date().toLocaleDateString();
                //= new Date().toLocaleString();
                userTasks = (content.data.tasks);
                userTasks.push(record);

                updatedUser = { "emailId": emailId, "tasks": userTasks };
                //write updated user to tasksList file
                content = await alterARecord(file, fileContent.data, updatedUser);
                if (content.status == 200) {
                    content = httpSuccessResponse(success.SUCCESSFUL_TASK_INSERT, "");
                }
            }
        }
        else content = fileContent;
    }
    else content = httpActionRestrictedResponse(failure.TASK_RECORD_ALREADY_PRESENT);
    return content;
}


/**
 * Update the Task by its TaskId
 * Process : Get a Task by taskId->  Read tasksList.json -> Find the user object -> Alter updatedTask -> Alter the updatedUser in place
 * @param {string} emailId 
 * @param {string} id - TaskId
 * @param {object} record - task passed in req.body
 * @returns {object} content - { status, message, data }
 */
const modifyTaskService = async (emailId, id, record) => {
    taskFound = await listTaskByIdService(emailId, id);
    if (taskFound.status == 200) {
        // Get the all userObjects from tasksList.json for writing to taskLists file
        fileContent = await readData(file);
        if (fileContent.status == 200) {
            // Get the users's object from tasksList.json
            content = await fetchARecord(fileContent.data, "emailId", emailId);
            if (content.status == 200) {
                // Update the task
                userTasks = (content.data.tasks);
                userTasks = userTasks.map(task => {
                    if (task.taskId == id) {
                        return {
                            "taskId": id,
                            "title": (record.title === undefined) ? (task.title) : (record.title),
                            "description": (record.description === undefined) ? (task.description) : (record.description),
                            "priority": (record.priority === undefined) ? (task.priority) : (record.priority),
                            "dueDate": (record.dueDate === undefined) ? (task.dueDate) : (record.dueDate),

                            "createdDate": task.createdDate,
                            "comments": task.comments
                        };
                    }
                    return task;
                });
                // Write updated user to tasksList file
                content = await alterARecord(file, fileContent.data, { "emailId": emailId, "tasks": userTasks });
                if (content.status == 200) {
                    content = httpSuccessResponse(success.SUCCESSFUL_TASK_MODIFY, "");
                }
            }
        }
        else content = fileContent;
    }
    else content = httpActionRestrictedResponse(failure.TASK_RECORD_NOT_FOUND);
    return content;
}


/**
 * Delete the Task by its TaskId
 * Process : Get a Task by taskId->  Read tasksList.json -> Find the user object -> Delete the task -> Alter the userObject in place
 * @param {string} emailId 
 * @param {string} id - TaskId
 * @returns {object} content - { status, message, data }
 */
const deleteTaskService = async (emailId, id) => {
    taskFound = await listTaskByIdService(emailId, id);
    if (taskFound.status == 200) {
        // Get the all userObjects from tasksList.json for writing to taskLists file
        fileContent = await readData(file);
        // Get the users's object from tasksList.json
        if (fileContent.status == 200) {
            content = await fetchARecord(fileContent.data, "emailId", emailId);
            if (content.status == 200) {
                // Delete the task
                userTasks = (content.data.tasks);
                userTasks = userTasks.filter((record) => { return (record.taskId != id) });
                // Write updated user to tasksList file
                content = await alterARecord(file, fileContent.data, { "emailId": emailId, "tasks": userTasks });
                if (content.status == 200) {
                    content = httpSuccessResponse(success.SUCCESSFUL_TASK_DELETE, "");
                }
            }
        }
        else content = fileContent;
    }
    else content = httpActionRestrictedResponse(failure.TASK_RECORD_NOT_FOUND);
    return content;
}


/**
 * Filters tasks based on given params
 * @param {object} allTasks - from taskList file
 * @param {*} title 
 * @param {*} priority 
 * @param {*} dueDate 
 * @returns {object} allTasks - { status, message, data }
 */
const filterTasksService = async (allTasks, title, priority, dueDate) => {
    if (title) {
        //title that starts with the params title
        allTasks = allTasks.filter((task) => { return (task.title).startsWith(title); });
    }
    if (priority) {
        //priority equal to params priority
        allTasks = allTasks.filter((task) => { return (task.priority) == priority; });
    }
    if (dueDate) {
        //due date starts with params due date (time not mentioned). same date tasks are displayed
        allTasks = allTasks.filter((task) => { return (task.dueDate).startsWith(dueDate); });
    }
    //console.log("No of tasks filtered : ", allTasks.length);
    if (allTasks.length > 0) allTasks = httpSuccessResponse(success.SUCCESSFUL_TASKS_FILTER, allTasks);
    else allTasks = httpNotFoundResponse(failure.TASKS_NOT_FOUND, "");
    return allTasks;
};


/**
 * Sorts tasks based on given params and on choice Descending ordereed
 * @param {object} allTasks - from taskList file
 * @param {string} sortParameter 
 * @param {*} order 
 * @returns {object} { status, message, data }
 */
const sortTasksService = async (allTasks, sortParameter, order) => {
    if (sortParameter != "title" && sortParameter != "priority" && sortParameter != "dueDate")
        return httpActionRestrictedResponse(failure.FAILURE_TASKS_SORTED, "");
    // Order
    if (!order || order == "ascending" || order == "descending") {
        allTasks = allTasks.sort((task1, task2) => {
            task1Info = getValue(sortParameter, task1[sortParameter]);
            task2Info = getValue(sortParameter, task2[sortParameter]);

            if (task1Info < task2Info) return (order == "descending") ? 1 : -1;
            else if (task1Info > task2Info) return (order == "descending") ? -1 : 1;
        });
        return httpSuccessResponse(success.SUCCESSFUL_TASKS_FILTER, allTasks);
    }
    else return httpInvalidOperationResponse(failure.INVALID_SORT, "");
}


/**
 * Paginate based on given tasksPerPage and on choice pageNumbered
 * @param {object} allTasks - from taskList file
 * @param {string} tasksPerPage 
 * @param {*} pageNumber 
 * @returns {object} allTasks - { status, message, data }
 */
const paginateTasksService = async (allTasks, tasksPerPage, pageNumber) => {
    //If PageNumber not defined, set pagenumber to 1
    if (pageNumber === undefined) pageNumber = 1;
    //If tasksPerPage and pageNumber have a number type value
    if (!isNaN(tasksPerPage) && tasksPerPage > -1 && !isNaN(pageNumber)) {
        if (tasksPerPage > 0) {
            //unary + to convert string to number
            startingIndex = +tasksPerPage * +(pageNumber - 1);
            endingIndex = +startingIndex + +tasksPerPage;
            items = allTasks.slice(startingIndex, endingIndex);

            if (items.length > 0) allTasks = httpSuccessResponse(success.SUCCESSFUL_PAGINATION, items);
            else allTasks = httpNotFoundResponse(failure.NO_OF_PAGES_EXCEEDED, "");
        }
        else {
            allTasks = httpInvalidOperationResponse(failure.TASKS_NOT_FOUND, "");
        }
    }
    //If tasksPerPage or pageNumber does not have a number type value
    else {
        //to specify the param that has NaN type data
        message = (isNaN(tasksPerPage)) ? " for tasksPerPage" : " for pageNumber";
        allTasks = httpInvalidOperationResponse(failure.NUMBER_EXPECTED + message, "");
    }
    return allTasks;
}


/**
 * Whenever a user is created, creates his account in tasksList file
 * @param {string} id - user emailId
 * @returns {object} content - { status, message, data }
 */
const createEntryInTaskListService = async (id) => {
    content = await readData(file);
    //File read successful
    if (content.status == 200 || (content.status == 404 && content.message == "File has no Records")) {
        if ((content.status == 404 && content.message == "File has no Records")) content.data = "[]";
        content = await insertARecord(file, content.data, { "emailId": id, "tasks": [] });
    }
    return content;
}


module.exports = { listAllTasksService, listTaskByIdService, createTaskService, modifyTaskService, deleteTaskService, sortTasksService, filterTasksService, paginateTasksService, createEntryInTaskListService };
