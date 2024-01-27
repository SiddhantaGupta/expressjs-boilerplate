class ApiError extends Error {
    constructor({ statusCode, message, data, isOperational, stack }) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational || true;
        if (data) {
            this.data = data;
        }
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
