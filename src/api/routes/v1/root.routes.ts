import express from 'express';
import httpStatus from 'http-status';
import tryCatch from '@utilities/tryCatch.js';
import config from '@config/config.js';
import { Request, Response } from 'express';

const router = express.Router();

/**
 * @openapi
 *  /api/v1/healthcheck:
 *      get:
 *          tag:
 *              - Healthcheck
 *          description: Responds if the app is up and running
 *          responses:
 *              200:
 *                  description: Returns a string
 */
router.get(
    '/healthcheck',
    tryCatch((req: Request, res: Response) =>
        res.status(httpStatus.OK).send(`${config.appName} service running.`),
    ),
);

export default router;
