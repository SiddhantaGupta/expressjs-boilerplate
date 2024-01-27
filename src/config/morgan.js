import morgan from 'morgan';
import logger from './logger.js';
import config from './config.js';

morgan.token('message', (req, res) => res.locals.errorMessage || '');
morgan.token('user', (req, res) => req.user?.username || '');
morgan.token('req-body', (req) => JSON.stringify(req.body) || '');
morgan.token('res-body', (req, res) => JSON.stringify(res.__custombody__) || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
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
