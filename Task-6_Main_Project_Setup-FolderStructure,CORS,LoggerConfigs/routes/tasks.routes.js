const express = require('express');
const { listAllTasksController, listTaskByIdController, createTaskController, modifyTaskController, deleteTaskController } = require('../controllers/tasks.controllers');
const tasksRouter = express.Router();

//Valid Routes to access tasks
tasksRouter.get('/', listAllTasksController);
tasksRouter.get('/:id', listTaskByIdController);
tasksRouter.post('/', createTaskController);
tasksRouter.put('/:id', modifyTaskController);
tasksRouter.delete('/:id', deleteTaskController);

module.exports = tasksRouter;