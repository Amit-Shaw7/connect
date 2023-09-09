import { logEvents } from "../logger/logger.js"

export const createError = (error, req, res, next) => {
    logEvents(`${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    
    console.log(error.stack);
    const status = error.statusCode ? error.statusCode : 500;

    return res.status(status).json({
        msg: error.message
    });
}