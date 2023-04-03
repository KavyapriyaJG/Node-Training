const express = require('express');
let buddyRouter = express();
require('dotenv').config();

const listAll = require('./listBuddy.routes');
const createBuddy = require('./createBuddy.routes');
const modifyBuddy = require('./modifyBuddy.routes');
const deleteBuddy = require('./deleteBuddy.routes');


//4.  A) Create a GET Request to list all the buddy's information
//4.  B) Create a GET Request to list a single buddy's information using his employeeId/realName
buddyRouter.use('/get',listAll);

//4.  C) Create a POST Request to add new buddy information to the existing list
buddyRouter.use('/post', createBuddy);

//4.  D) Create a PUT Request to update the existing buddy information like nickname, hobbies
buddyRouter.use('/put', modifyBuddy);

//4.  E) Create a DELETE Request to delete an existing buddy
buddyRouter.use('/delete', deleteBuddy);


module.exports = buddyRouter;