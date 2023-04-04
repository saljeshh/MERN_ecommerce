class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        // method of Error parent
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = ErrorHandler