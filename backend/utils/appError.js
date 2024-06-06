class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational=true;
        
        
        //to prevent error to appear in error stack since we are already handling them in here
        Error.captureStackTrace(this,this.constructor);
        
    }
}

module.exports = AppError;