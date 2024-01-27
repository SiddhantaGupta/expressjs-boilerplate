import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(import.meta.dirname, '../.env'),
});

const config = {
    env: process.env.NODE_ENV || 'local',
    port: process.env.NODE_LOCAL_PORT || 8080,
    appName: process.env.APP_NAME || 'express-boilerplate',
    log: {
        level: process.env.LOG_LEVEL || 'debug',
    },
};

export default config;
