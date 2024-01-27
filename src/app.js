// express
import express from 'express';

// middlewares
import cors from 'cors';
import { errorConverter, errorHandler } from './api/middlewares/error.middleware.js';
import * as morgan from './config/morgan.js';

// routes
import routesV1 from './api/routes/v1/index.js';

// libs / utils
import httpStatus from 'http-status';
import ApiError from './utilities/ApiError.js';

const setupApp = async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // setting __custombody__ as response body so that morgan can access it later
    const originalSend = app.response.send;
    app.response.send = function sendOverWrite(body) {
        originalSend.call(this, body);
        this.__custombody__ = body;
    };
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);

    app.use('/api/v1', routesV1);

    // send back a 404 error for any unknown api request
    app.use('*', (req, res, next) => {
        next(new ApiError({ statusCode: httpStatus.NOT_FOUND, message: 'Not found' }));
    });

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);

    return app;
};

export default setupApp;
