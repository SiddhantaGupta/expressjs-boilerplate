import morgan from 'morgan';
import logger from '@config/logger.js';
import config from '@config/config.js';
import Environments from '@globals/Environments.js';
import { Request, Response } from 'express';

morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');
morgan.token('user', (req: Request, res: Response) => req.user?.username || '');
morgan.token('req-body', (req: Request) => JSON.stringify(req.body) || '');
morgan.token('res-body', (req: Request, res: Response) => JSON.stringify(res.__custombody__) || '');

const getIpFormat = () => (config.env === Environments.Production ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status :user-agent :user :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status :user-agent :user :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.http(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };
