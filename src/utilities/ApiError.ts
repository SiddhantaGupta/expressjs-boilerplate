type ApiErrorOptions = {
    statusCode: number;
    message: string;
    data?: any;
    isOperational?: boolean;
    stack?: any;
};

class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    data: any;
    stack: any;
    constructor({ statusCode, message, data, isOperational, stack }: ApiErrorOptions) {
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
