const axios = require('axios');
const { success, failure } = require('../utils/CONSTANTS');
require('dotenv').config();
const port = process.env.PORT;
const taskId = 1;
const tasksRoute = `http://localhost:${port}/listify/tasks`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoidXNlcjlAZ21haWwuY29tIiwiaWF0IjoxNjgxMzgzOTI5LCJleHAiOjE2ODEzODU3Mjl9.MxDulYwpz86QYu3xi4xdeHhkQuqATQ2Yej7hC78peoE";


//FIRST SET THE BEARER TOKEN ...... !

describe('Task Creation Tests', () => {
    test('Task created on posting mandatory details', async () => {
        const req = {
            body: {
                taskId: "2092",
                title: "once upon a time",
                description: "description",
                priority: "medium",
                dueDate: "4/23/2023",
                comments: [
                    {
                        "comment": "comment 1"
                    }
                ]
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.post(`${tasksRoute}`, req.body, config);
            expect(response.status).toBe(201);
            expect(response.message).toEqual(success.SUCCESSFUL_TASK_INSERT);
        } catch (err) { }
    });

    test('New task with an existing Task Id', async () => {
        const req = {
            body: {
                taskId: "1",
                title: "once upon a time",
                description: "description",
                priority: "medium",
                dueDate: "4/23/2023",
                comments: [
                    {
                        "comment": "comment 1"
                    }
                ]
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.post(`${tasksRoute}`, req.body, config);
        } catch (err) {
            expect(err.response.status).toBe(409);
            expect(err.response.data).toEqual(failure.TASK_RECORD_ALREADY_PRESENT);
        }
    });

    test('New task with missing mandatory fields', async () => {
        const req = {
            body: {
                taskId: "209",
                title: "once upon a time",
                description: "description",
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.post(`${tasksRoute}`, req.body, config);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual("priority,dueDate,comments are not valid !");
        }
    });

    test('New valid task with tampered or missing bearer auth token', async () => {
        const req = {
            body: {
                taskId: "207",
                title: "once upon a time",
                description: "description",
                priority: "medium",
                dueDate: "4/23/2023",
                comments: [
                    {
                        "comment": "comment 1"
                    }
                ]
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.post(`${tasksRoute}`, req.body);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toEqual(failure.USER_NOT_AUTHENTICATED);
        }
    });
});


describe('All tasks read Tests', () => {
    test('Read all tasks', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toEqual(failure.SERVER_ERROR);
        }
    });

    test('Read all tasks with tampered or missing token', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toEqual(failure.USER_NOT_AUTHENTICATED);
        }
    });

    //-----------------------------------------FILTER-----------------------------------------------//

    test('Read all tasks with a valid filter', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}?title=not`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toEqual(failure.SERVER_ERROR);
        }
    });

    test('Read all tasks with Invalid filter', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}?comments=sarcasm`, config);
        } catch (err) {
            expect(err.response.status).toBe(409);
            expect(err.response.data).toEqual(failure.NOT_VALID_OPERATION);
        }
    });

    test('Read all tasks in filter without bearer auth token', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}?priority=low`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toBe(failure.USER_NOT_AUTHENTICATED);
        }
    });

    //-----------------------------------------SORTING-----------------------------------------------//

    test('Read and Display in Sorted order without user authentication', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}?sortBy=title`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toBe(failure.USER_NOT_AUTHENTICATED);
        }
    });

    test('Read all tasks with a valid sort parameter', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?sortBy=title`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toEqual(failure.SERVER_ERROR);
        }
    });

    test('Read all tasks with an Invalid sort parameter', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?sortBy=comment`, config);
        } catch (err) {
            expect(err.response.status).toBe(409);
            expect(err.response.data).toEqual(failure.FAILURE_TASKS_SORTED);
        }
    });

    test('Read all tasks with a valid sort parameter and  a valid order', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?sortBy=title&order=descending`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toEqual(failure.SERVER_ERROR);
        }
    });

    test('Read all tasks with a valid sort parameter and an Invalid order', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?sortBy=title&order=chumma`, config);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual(failure.INVALID_SORT);
        }
    });

    //-----------------------------------------PAGINATION-----------------------------------------------//

    test('Paginate without token', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}?tasksPerPage=3`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toBe(failure.USER_NOT_AUTHENTICATED);
        }
    });

    test('Paginate with Incorrect syntax', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?tasks=3`, config);
        } catch (err) {
            expect(err.response.status).toBe(409);
            expect(err.response.data).toBe(failure.NOT_VALID_OPERATION);
        }
    });

    test('Paginate with correct syntax for tasksPerPage', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?tasksPerPage=3`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toBe(failure.SERVER_ERROR);
        }
    });

    test('Paginate with correct syntax for tasksPerPage and pageNumber', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?tasksPerPage=3&pageNumber=2`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toBe(failure.SERVER_ERROR);
        }
    });

    test('Requesting a pageNumber exceeding available number of pages', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}?tasksPerPage=3&pageNumber=200`, config);
        } catch (err) {
            expect(err.response.status).toBe(404);
            expect(err.response.data).toBe(failure.NO_OF_PAGES_EXCEEDED);
        }
    });

});


describe('Specific tasks read Tests', () => {
    test('Read a specific task by taskId', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}/${taskId}`, config);
            expect(response.status).toBe(200);
            expect(response.data && typeof response.data === 'object').toBe(true);
        } catch (err) {
            expect(err.response.status).toBe(500);
            expect(err.response.data).toEqual(failure.SERVER_ERROR);
        }
    });

    test('Read a specific task by a non existing taskId', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.get(`${tasksRoute}/1000`, config);
        } catch (err) {
            expect(err.response.status).toBe(404);
            expect(err.response.data).toEqual(failure.TASK_RECORD_NOT_FOUND);
        }
    });

    test('Read a specific task by taskId with tampered or missing token', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            //config not included
            let response = await axios.get(`${tasksRoute}/${taskId}`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toEqual(failure.USER_NOT_AUTHENTICATED);
        }
    });
});


describe('Task Editing Tests', () => {
    test('Task edit request on providing mandatory details', async () => {
        const req = {
            body: {
                title: "once upon a time",
                description: "description",
                priority: "medium",
                dueDate: "4/23/2023",
                comments: [
                    {
                        "comment": "comment 1"
                    }
                ]
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.put(`http://localhost:4012/listify/tasks/1`, req.body, config);
            expect(response.status).toBe(200);
            expect(response.message).toEqual(success.SUCCESSFUL_TASK_MODIFY);
        } catch (err) { }
    });

    test('Task edit request without any details', async () => {
        const req = {
            body: {
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.put(`${tasksRoute}/${taskId}`, req.body, config);
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual("Minimum one field like Title, Description, Priority, dueDate is needed !");
        }
    });

    test('Task edit with tampered or missing token', async () => {
        const req = {
            body: {
                title: "once upon a time",
                description: "description",
                priority: "medium",
                dueDate: "4/23/2023"
            }
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            // config not included
            let response = await axios.put(`${tasksRoute}/${taskId}`, req.body);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toEqual(failure.USER_NOT_AUTHENTICATED);
        }
    });

});


describe('Task Deletion Tests', () => {
    test('Task delete wit Id', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.delete(`${tasksRoute}/${taskId}`, config);
            expect(response.status).toBe(200);
            expect(response.message).toEqual(success.SUCCESSFUL_DELETE);
        } catch (err) { }
    });

    test('Attempt delete on non existing taskId', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.delete(`${tasksRoute}/${taskId}`, config);
        } catch (err) {
            expect(err.response.status).toBe(409);
            expect(err.response.data).toEqual(failure.TASK_RECORD_NOT_FOUND);
        }
    });

    test('Attempt delete without bearer token', async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            let response = await axios.delete(`${tasksRoute}/${taskId}`);
        } catch (err) {
            expect(err.response.status).toBe(401);
            expect(err.response.data).toEqual(failure.USER_NOT_AUTHENTICATED);
        }
    });

});