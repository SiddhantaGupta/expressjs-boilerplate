import express from 'express';
import * as authController from '@controllers/auth.controller.js';

const router = express.Router();

/**
 * @openapi
 *  /api/v1/auth/register:
 *      post:
 *          tags:
 *              - User
 *          summary: Register a user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateUserInput'
 *          responses:
 *              201:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CreateUserResponse'
 *              409:
 *                  description: Conflict
 *              400:
 *                  description: Bad Request
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
