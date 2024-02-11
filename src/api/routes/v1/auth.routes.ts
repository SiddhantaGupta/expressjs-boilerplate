import express from 'express';
import * as authController from '@controllers/auth.controller.js';

const router = express.Router();

/**
 * @openapi
 *  /api/v1/auth/register:
 *      post:
 *          tags:
 *              - Auth
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
 *                              $ref: '#/components/schemas/LoginUserResponse'
 *              409:
 *                  description: Conflict
 *              400:
 *                  description: Bad Request
 */
router.post('/register', authController.register);

/**
 * @openapi
 *  /api/v1/auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: Login a user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginUserInput'
 *          responses:
 *              200:
 *                  description: Created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/LoginUserResponse'
 *              400:
 *                  description: Bad Request
 */
router.post('/login', authController.login);

export default router;
