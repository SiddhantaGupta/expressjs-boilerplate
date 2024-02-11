import { LoginSchema, RegisterationSchema } from '@validations/schemas/auth.validation.js';
import users from '@repositories/user.repository.js';
import bcrypt from 'bcrypt';
import globals from '@globals/globals.js';
import ApiError from '@utilities/ApiError.js';
import config from '@config/config.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { roles } from '@config/roles.js';

const register = async (registerBody: RegisterationSchema) => {
    const userExists = (await users.findByEmail(registerBody.email))[0];
    if (userExists) {
        throw new ApiError({
            statusCode: httpStatus.CONFLICT,
            message: httpStatus[httpStatus.CONFLICT],
        });
    }
    if (!roles.includes(String(registerBody.role))) {
        throw new ApiError({
            statusCode: httpStatus.BAD_REQUEST,
            message: httpStatus[httpStatus.BAD_REQUEST],
        });
    }
    registerBody.password = await bcrypt.hash(registerBody.password, globals.bcryptSaltRounds);
    return (await users.insert(registerBody))[0];
};

const login = async (loginBody: LoginSchema) => {
    const user = (await users.findByEmail(loginBody.email))[0];
    const isPasswordMatch = await bcrypt.compare(loginBody.password, user.password);
    if (!user || !isPasswordMatch) {
        throw new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: httpStatus[httpStatus.UNAUTHORIZED],
        });
    }
    const payload = {
        sub: user.uuid,
        iat: Date.now(),
        exp: Date.now() + 60 * 60 * 1000,
    };
    const accessToken = jwt.sign(payload, config.jwt.secret);
    return {
        user: user,
        tokens: {
            access: accessToken,
        },
    };
};

export default { login, register };
