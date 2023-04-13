require('dotenv').config();
const { writeData, checkIfFileExists } = require('./utils/file.utils');
const express = require('express');
const listifyRouter = require('./routes/listify.routes');
const logger = require('./loggers/logger.router');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: "get, post, put, delete",
    exposedHeaders: 'Authorization'
}));

//Listify route
app.use('/listify', listifyRouter);

//Any other routes
app.use('/*', (req, res) => {
    logger.http(`Wrong route hit via { req: { method: ${req.method}, url: ${req.originalUrl}, headers: { User-Agent : ${req.headers['user-agent']} } }`);
    res.status(405).send("Wrong route hit");
});

let port = process.env.PORT;
let usersFile = process.env.USERS_LIST_FILE;
let tasksFile = process.env.TASKS_LIST_FILE;

app.listen(port || 4015, async () => {
    logger.info(`Server is listening @ port : ${port}`);

    //if no user file, create a file with empty array 
    if (!checkIfFileExists(usersFile)) {
        await writeData(usersFile, []);
    }
    //if no tasks file, create a file with empty array 
    if (!checkIfFileExists(tasksFile)) {
        await writeData(tasksFile, []);
    }

});
