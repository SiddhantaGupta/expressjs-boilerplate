// express
import express from 'express';

// middlewares
import cors from 'cors';
import { errorConverter, errorHandler } from '@middlewares/error.middleware.js';
import * as morgan from '@config/morgan.js';

// routes
import routesV1 from '@routes/v1/index.js';

// libs / utils
import httpStatus from 'http-status';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import { jwtStrategy } from '@config/passport.js';
import ApiError from '@utilities/ApiError.js';
import config from '@config/config.js';
import swaggerDocs from '@config/swagger.js';

const setupApp = async () => {
    const app = express();

    // set security HTTP headers
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // gzip compression
    app.use(compression());

    const corsOptions = {
        origin: [/https:\/\/.*\.example\.co\.in/, /https?:\/\/localhost(:[0-9]+)?/],
        credentials: true,
    };
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));

    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    // setting __custombody__ as response body so that morgan can access it later
    const originalSend = app.response.send;
    app.response.send = function (body: any): any {
        originalSend.call(this, body);
        this.__custombody__ = body;
    };
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);

    swaggerDocs(app, config.port);
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
