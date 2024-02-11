import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(import.meta.dirname, '../../.env'),
});

const config = {
    env: process.env.NODE_ENV || 'local',
    port: Number(process.env.NODE_LOCAL_PORT) || 8080,
    appName: process.env.APP_NAME || 'express-boilerplate',
    log: {
        level: process.env.LOG_LEVEL || 'debug',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_DATABASE || 'db',
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'supersecret',
    },
};

export default config;
