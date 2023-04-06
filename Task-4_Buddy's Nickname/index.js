require('dotenv').config();
const express = require('express');
const { writeData, checkIfFileExists } = require('./utils/file.utils');
const buddyRouter = require('./routes/buddy.router');
let app = express();


app.use(express.urlencoded( {extended: false}));
app.use(express.json());

//Buddy Router
app.use('/buddy', buddyRouter);

//Base Router
app.use('/', (req, res)=>{
    res.send("Base route!");
});

let port = process.env.PORT;
let file = process.env.FILE;
app.listen(port, async ()=>{
    console.log("Server is listening @ port : "+port);

    //if no file, create a file with empty array 
    if (!checkIfFileExists(file)) {
        await writeData(file, []);
    }

});

