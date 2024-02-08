import winston from 'winston';
import config from './config.js';
import Environments from '../globals/Environments.js';

/** Log Levels
    {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    }
 */

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

let winstonTransports: winston.transport[] = [
    new winston.transports.Console({
        stderrLevels: ['error'],
    }),
];

let winstonFormat;
if (config.env === Environments.Local) {
    winstonFormat = winston.format.combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
        winston.format.printf(({ timestamp, level, message, metadata }) => {
            return `${timestamp} ${level}: ${
                typeof message === 'string' ? message : JSON.stringify(message)
            } ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
        }),
    );
} else if (config.env === Environments.Production) {
    winstonFormat = winston.format.combine(
        enumerateErrorFormat(),
        winston.format.errors({ message: true }),
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
        winston.format.json(),
    );
    winstonTransports.push(new winston.transports.File({ filename: 'logs/express.log' }));
}

const logger = winston.createLogger({
    level: config.log.level,
    format: winstonFormat,
    transports: winstonTransports,
});

export default logger;
