//1. Create an HTTP Server using Express Package and have all the basic things implemented
const express = require('express');
let app = express();

const buddyRouter = require('./routes/buddy.router');

app.use(express.urlencoded( {extended: false}));
app.use(express.json());

require('dotenv').config();

app.use('/buddy', buddyRouter);

app.use('/', (req, res)=>{
    res.send("Base route!");
});

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("Server is listening @ port : "+port);
});

