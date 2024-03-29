import setupApp from './app.js';
import logRegisteredRoutes from '@utilities/logRegisteredRoutes.js';
import config from '@config/config.js';
import logger from '@config/logger.js';

const app = await setupApp();
const server = app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
    logRegisteredRoutes(app);
});

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
