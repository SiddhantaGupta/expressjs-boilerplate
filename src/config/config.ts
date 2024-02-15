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
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.PORT) || 6379,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'supersecret',
        accessTokenExpirationMinutes: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES) || 30,
        refreshTokenExpirationDays: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS) || 14,
    },
};

export default config;
