const { listAllTasksService, listTaskByIdService, createTaskService, modifyTaskService, deleteTaskService, filterTasksService, sortTasksService, paginateTasksService } = require('../services/tasks.services');
const { failure } = require('../utils/CONSTANTS');
const { httpActionRestrictedResponse, httpResourceCreatedResponse } = require('../utils/httpResponses');
const { validateCreateTask, validateModifyTask } = require('../utils/validateInput.utils');
const { servicesLogger } = require('../loggers/services.logger');
const logger = require('../loggers/logger.router');

userAction = servicesLogger();

/**
 * Lists all Tasks 
 * If query params present, passes data and control to queryTasksController
 * @param {Request} req 
 * @param {Response} res
 */
const listAllTasksController = async (req, res) => {    
    const userId = req.user.emailId;
    userAction.info(` ${req.headers['user-agent']} via ${userId} requested to view all tasks { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
    let response = await listAllTasksService(userId);
    if (response.status == 200) {
        //If Query params present, passed allTasks data and control to queryTasksController
        if (JSON.stringify(req.query) !== '{}'){
            userAction.info(` ${req.headers['user-agent']} via ${userId} requested to Query on Tasks { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
            queryTasksController(response.data, req.query, res);
        } 
        //No query params so send allTasks data
        else res.status(response.status).json(response.data);
    }
    else res.status(response.status).send(response.message);
}

/**
 * Lists a Task by its Id
 * @param {Request} req 
 * @param {Response} res 
 */
const listTaskByIdController = async (req, res) => {
    const userId = req.user.emailId;
    //userAction.info(` ${req.headers['user-agent']} via ${userId} requested to view Task ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
    let response = await listTaskByIdService(userId, req.params.id);
    if(response.status == 200){
        res.status(response.status).json(response.data);
    }
    else {
        logger.warn(`${userId}'s Task ${req.params.id} not found on "${req.originalUrl}" through ${req.method}`);
        res.status(response.status).send(response.message);
    }
}

/**
 * Creates a new Task for the userId
 * @param {Request} req 
 * @param {Response} res 
 */
const createTaskController = async (req, res) => {
    const userId = req.user.emailId;
    response = validateCreateTask(req.body);
    if(response.status==200){
        let { taskId, title, description, priority, dueDate, comments } = req.body;
        userAction.info(` ${req.headers['user-agent']} via ${userId} requested to create Task ${taskId} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
        let task = { taskId, title, description, priority, dueDate, comments };
        response = await createTaskService(userId, task);
        if(response.status==200) response = httpResourceCreatedResponse(response.message, response.data);
        else    logger.warn(`${userId}'s  request to create Task failed on "${req.originalUrl}" through ${req.method}`);
    }
    res.status(response.status).send(response.message);
}

/**
 * Modifies the taskId's task for the userId
 * @param {Request} req 
 * @param {Response} res 
 */
const modifyTaskController = async (req, res) => {
    const userId = req.user.emailId;
    response = validateModifyTask(req.body);
    if(response.status==200){
        let { title, description, priority, dueDate, comments } = req.body;
        userAction.info(` ${req.headers['user-agent']} via ${userId} requested to modify Task ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
        let task = { title, description, priority, dueDate, comments };
        response = await modifyTaskService(userId, req.params.id, task);
        if(response.status!=200){
            logger.warn(`${userId}'s  request to modify Task ${req.params.id} failed on "${req.originalUrl}" through ${req.method}`);
        }
    }
    res.status(response.status).send(response.message);
}

/**
 * Deletes the taskId's task for the userId
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteTaskController = async (req, res) => {
    const userId = req.user.emailId;
    userAction.info(` ${req.headers['user-agent']} via ${userId} requested to delete Task ${req.params.id} { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
    let response = await deleteTaskService(userId, req.params.id);
    if(response.status!=200){
        logger.warn(`${userId}'s  request to delete Task ${req.params.id} failed on "${req.originalUrl}" through ${req.method}`);
    }
    res.status(response.status).send(response.message);
}

/**
 * Can fetch tasks upon operations like Filter, Sort, Pagination
 * @param {Request} req 
 * @param {Response} res 
 */
const queryTasksController = async (data, queryParameters, res) => {
    let { title, priority, dueDate, sortBy, order, tasksPerPage, pageNumber } = queryParameters;
    //if someother invalid query params given, response set in advance
    response = httpActionRestrictedResponse(failure.NOT_VALID_OPERATION, "");

    isFilterApplied = false; isSortByApplied = false;
    //Filtering tasks
    if (title || priority || dueDate) {
        response = await filterTasksService(data, title, priority, dueDate);
        isFilterApplied = ((response.status) == 200);
    }
    if (sortBy) {
        //if filter applied, filtered data is fed to sorting. else allTasks data
        if (isFilterApplied) data = response.data;
        response = await sortTasksService(data, sortBy, order);
        isSortByApplied = ((response.status) == 200);
    }
    if (tasksPerPage) {
        //if filter/sort applied, filtered/sorted cascaded data is fed to pagination. else allTasks data
        if (isFilterApplied || isSortByApplied) data = response.data;
        response = await paginateTasksService(data, tasksPerPage, pageNumber);
    }

    if(response.status == 200){
        res.status(response.status).json(response.data);
    }
    else {
        res.status(response.status).send(response.message);
        logger.warn(`Request to query Tasks failed !`);
    }
}

module.exports = { listAllTasksController, listTaskByIdController, createTaskController, modifyTaskController, deleteTaskController };
