export const handleError = (error, res, code, msg) => {
    return res.status(code).json({
        error: msg ? msg : error.message
    })
}