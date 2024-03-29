import httpStatus from 'http-status';
import ApiError from '@utilities/ApiError.js';
import logger from '@config/logger.js';
import config from '@config/config.js';
import Environments from '@globals/Environments.js';
import { Request, Response, NextFunction } from 'express';

const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError({ statusCode, message, isOperational: false, stack: err.stack });
    }
    next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message, data } = err;
    if (config.env === Environments.Production && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(data && { data: data }),
        ...(config.env === Environments.Local && { stack: err.stack }),
    };

    if (config.env === Environments.Local) {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
