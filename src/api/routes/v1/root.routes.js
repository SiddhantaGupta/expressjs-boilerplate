import express from 'express';
import httpStatus from 'http-status';
import tryCatch from '../../../utilities/tryCatch.js';
import config from '../../../config/config.js';

const router = express.Router();

router.get(
    '/health',
    tryCatch((req, res) => res.status(httpStatus.OK).send(`${config.appName} service running.`)),
);

export default router;
