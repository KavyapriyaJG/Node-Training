let jwt = require('jsonwebtoken');
const { failure } = require('../utils/CONSTANTS');
const { httpUnauthorisedAccessDeniedResponse } = require('../utils/httpResponses');
require('dotenv').config();
const secretKey = process.env.ACCESS_TOKEN_SECRET;

/**
 * Verifies and Decides if the user can be authenticated to access tasks
 * @param {Request} req 
 * @param {Response} res
 * @param {*} next 
 */
const verifyUser = (req, res, next) => {
    try {
        const bearerToken = (req.headers.authorization).split(' ')[1];
        if (bearerToken) {
            const decodedEmailId = jwt.verify(bearerToken, secretKey);
            //using jwt session's user object to know which userID logged in
            req.user = decodedEmailId;
        }
        next();
    } catch (err) {
        response = httpUnauthorisedAccessDeniedResponse(failure.USER_NOT_AUTHENTICATED, "");
        res.status(response.status).send(response.message);
    }
}

module.exports = { verifyUser };