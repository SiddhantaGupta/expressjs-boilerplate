import httpStatus from 'http-status';
import authService from '@services/auth.service.js';
import tryCatch from '@utilities/tryCatch.js';
import { registerationSchema, loginSchema } from '@validations/schemas/auth.validation.js';
import { validate } from '@validations/validate.js';
import { NextFunction, Request, Response } from 'express';
import transform from '@transformers/transform.js';
import userTransformer from '@transformers/user.transformer.js';
import { User } from '@/repositories/user.repository.js';

const register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const registerBody = await validate(registerationSchema, req.body);
    const registeredUser = await authService.register(registerBody);
    login(req, res, next);
    // const responseUser = await transform(registeredUser, userTransformer);
    // res.status(httpStatus.CREATED).send(responseUser);
});

const login = tryCatch(async (req: Request, res: Response) => {
    const loginBody = await validate(loginSchema, req.body);
    const loginData = await authService.login(loginBody);
    loginData.user = (await transform(loginData.user, userTransformer)) as User;
    res.send(loginData);
});

export { login, register };
