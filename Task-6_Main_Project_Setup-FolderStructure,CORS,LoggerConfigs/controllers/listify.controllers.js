const { signUpService, loginService } = require('../services/listify.services');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../utils/validateInput.utils');
require('dotenv').config();
const { httpResourceCreatedResponse } = require('../utils/httpResponses');
const { entryLogger } = require('../loggers/entry.logger');
const { response } = require('express');
const usersFile = process.env.USERS_LIST_FILE;
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const userSessionValidityPeriod = process.env.SESSION_TIME;

user = entryLogger();

/**
 * Signs in a new user
 * @param {Request} req 
 * @param {Response} res 
 */
const signUpController = async (req, res) => {
    let response = validateUser(req.body, "signUp");
    if(response.status==200){
        user.info(`"${req.body.emailId}" Signed in through ${req.headers['user-agent']} by { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
        response = await signUpService(usersFile, req.body);
        if(response.status==200) response = httpResourceCreatedResponse(response.message, response.data);
    }
    res.status(response.status).send(response.message);
}

/**
 * Logs in a new user
 * @param {Request} req 
 * @param {Response} res 
 */
const loginController = async (req, res) => {
    let response = validateUser(req.body, "logIn");
    if(response.status==200){
        response = await loginService(usersFile, req.body);
        if (response.status == 200) {
            user.info(`"${req.body.emailId}" Logged In through ${req.headers['user-agent']} by { req: { method: ${req.method}, url: ${req.originalUrl}} } }`);
            const token = jwt.sign({ "emailId": req.body.emailId }, secretKey, { expiresIn: userSessionValidityPeriod });
            //Send token to user
            res.status(response.status).json({ token: token });
        }
        else res.status(response.status).send(response.message);
    } 
    else res.status(response.status).send(response.message);
}


module.exports = { signUpController, loginController };
