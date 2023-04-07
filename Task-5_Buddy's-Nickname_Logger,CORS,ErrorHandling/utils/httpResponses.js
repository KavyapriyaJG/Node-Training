/**
 * Success Response
 */
httpSuccessResponse = (message="",data=0)=>{ //setting data to empty string causes error
    return { status: 200, message: message, data: data };
}

/**
 * File Access Permission Denied Response
 */
httpPermissionDeniedResponse = (message="",data=0)=>{
    return { status: 403, message: message, data: data };
}

/**
 * Not Found Response
 */
httpNotFoundResponse = (message="",data=0) => {
    return { status: 404, message: message, data: data };
}

/**
 * Requested Action Restricted Response
 */
httpActionRestrictedResponse = (message="",data=0)=>{
    return { status: 409, message: message, data: data };
}


module.exports = { httpPermissionDeniedResponse, httpSuccessResponse, httpNotFoundResponse, httpActionRestrictedResponse };
