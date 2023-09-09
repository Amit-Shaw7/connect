class ErrorHandler extends Error {
    constructor(msg, status) {
        super(msg);
        this.statusCode = status
        this.msg = msg || "INTERNAL_SERVER_ERROR"
    }
}

export default ErrorHandler;