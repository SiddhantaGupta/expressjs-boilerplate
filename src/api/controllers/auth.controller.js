import httpStatus from 'http-status';
import authService from '../services/auth.service.js';
import tryCatch from '../../utilities/tryCatch.js';
import { registerationSchema, loginSchema } from '../../validations/auth.validation.js';
import ApiError from '../../utilities/ApiError.js';
import { validate } from '../../validations/validate.js';

const register = tryCatch(async (req, res) => {
    const registerBody = await validate(registerationSchema, req.body);
    const registeredUser = await authService.register(registerBody.username, registerBody.password);
    res.status(httpStatus.CREATED).send(registeredUser);
});

const login = tryCatch(async (req, res) => {
    const loginBody = await validate(loginSchema, req.body);
    const user = await authService.login(loginBody.username, loginBody.password);
    res.send(user);
});

export { login, register };
