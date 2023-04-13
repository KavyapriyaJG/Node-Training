const { success, failure } = require('../utils/CONSTANTS');
const { listAllTasksService, listTaskByIdService, createTaskService, modifyTaskService, deleteTaskService } = require('../services/tasks.services');
const { signUpService, loginService } = require('../services/listify.services');
require('dotenv').config();
const usersFile = process.env.USERS_LIST_FILE;


describe('Signin service test', () => {
    test('With correct credentials', async () => {
        const user = {
            "emailId": "user91@gmail.com",
            "username": "user",
            "password": "password"
        }

        let response = await signUpService(usersFile, user);
        expect(response.status).toBe(200);
        expect(response.message).toBe(success.SUCCESSFUL_USER_SIGNUP);
    });

    test('With existing userId', async () => {
        const user = {
            "emailId": "user3@gmail.com",
            "username": "user",
            "password": "password"
        }

        let response = await signUpService(usersFile, user);
        expect(response.status).toBe(409);
        expect(response.message).toBe(failure.USER_ALREADY_PRESENT);
    });

});


describe('Login service tests', () => {
    test('With correct credentials', async () => {
        const user = {
            "emailId": "user3@gmail.com",
            "password": "password"
        }
        let response = await loginService(usersFile, user);
        expect(response.status).toBe(200);
        expect(response.message).toBe(success.SUCCESSFUL_USER_LOGIN);
        expect(response.data && typeof response.data === 'object').toBe(true);
    });

    test('With non existing userId', async () => {
        const user = {
            "emailId": "nonExisting@gmail.com",
            "password": "password"
        }
        let response = await loginService(usersFile, user);
        expect(response.status).toBe(401);
        expect(response.message).toBe(failure.USER_NOT_FOUND);
    });

});


describe('List all services tasks', () => {
    test('With correct credentials', async () => {
        const userId = "user9@gmail.com";

        let response = await listAllTasksService(userId);
        expect(response.status).toBe(200);
        expect(response.data && typeof response.data === 'object').toBe(true);
    });

    test('With incorrect userId', async () => {
        const userId = "incorrectUser@gmail.com";

        let response = await listAllTasksService(userId);
        expect(response.status).toBe(404);
        expect(response.message).toBe(failure.RECORD_NOT_FOUND);
    });

});


describe('List task by Id servcice tests', () => {
    test('With correct credentials', async () => {
        const userId = "user9@gmail.com";
        const req = {
            params: {
                id: "3"
            }
        };
        let response = await listTaskByIdService(userId, req.params.id);
        expect(response.status).toBe(200);
        expect(response.data && typeof response.data === 'object').toBe(true);
    });

    test('With non existing taskId', async () => {
        const userId = "user9@gmail.com";
        const req = {
            params: {
                id: "190909"
            }
        };
        let response = await listTaskByIdService(userId, req.params.id);
        expect(response.status).toBe(404);
        expect(response.message).toBe(failure.TASK_RECORD_NOT_FOUND);
    });

});


describe('Create a new task service tests', () => {
    test('With correct syntax', async () => {
        const emailId = "user9@gmail.com";
        const record = {
            "taskId": "3309",
            "title": "feg",
            "description": "description",
            "priority": "high",
            "dueDate": "4/9/2023",
            "comments": [
                {
                    "comment": "comment 1"
                }
            ]
        }
        let response = await createTaskService(emailId, record);
        expect(response.status).toBe(200);
        expect(response.message).toBe(success.SUCCESSFUL_TASK_INSERT);
    });

    test('With an already Existing taskId', async () => {
        const emailId = "user9@gmail.com";
        const record = {
            "taskId": "3",
            "title": "feg",
            "description": "description",
            "priority": "high",
            "dueDate": "4/9/2023",
            "comments": [
                {
                    "comment": "comment 1"
                }
            ]
        }
        let response = await createTaskService(emailId, record);
        expect(response.status).toBe(409);
        expect(response.message).toBe(failure.TASK_RECORD_ALREADY_PRESENT);
    });

});


describe('Modify Task service tests', () => {
    test('With correct syntax', async () => {
        const emailId = "user9@gmail.com";
        const id = "3"
        const record = {
            "title": "feg",
            "description": "description",
            "priority": "high",
            "dueDate": "4/9/2023"
        }
        let response = await modifyTaskService(emailId, id, record)
        expect(response.status).toBe(200);
        expect(response.message).toBe(success.SUCCESSFUL_TASK_MODIFY);
    });

    test('With non exisitng taskId', async () => {
        const emailId = "user9@gmail.com";
        const id = "1234567"
        const record = {
            "title": "feg",
            "description": "description",
            "priority": "high",
            "dueDate": "4/9/2023"
        }
        let response = await modifyTaskService(emailId, id, record)
        expect(response.status).toBe(409);
        expect(response.message).toBe(failure.TASK_RECORD_NOT_FOUND);
    });

});


describe('Delete Task service tests', () => {
    test('With exisitng Id', async () => {
        const emailId = "user9@gmail.com";
        const id = "3309";
        let response = await deleteTaskService(emailId, id);
        expect(response.status).toBe(200);
        expect(response.message).toBe(success.SUCCESSFUL_TASK_DELETE);
    });

    test('With non exisitng taskId', async () => {
        const emailId = "user9@gmail.com";
        const id = "1234567";
        let response = await deleteTaskService(emailId, id);
        expect(response.status).toBe(409);
        expect(response.message).toBe(failure.TASK_RECORD_NOT_FOUND);
    });

});

