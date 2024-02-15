import { LoginSchema, RegisterationSchema } from '@validations/schemas/auth.validation.js';
import * as Users from '@database/repositories/user.repository.js';
import bcrypt from 'bcrypt';
import globals from '@globals/globals.js';
import ApiError from '@utilities/ApiError.js';
import config from '@config/config.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { roles } from '@config/roles.js';

const register = async (registerBody: RegisterationSchema) => {
    const userExists = await Users.findByEmail(registerBody.email);
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
    return await Users.insert(registerBody);
};

const login = async (loginBody: LoginSchema) => {
    const user = await Users.findByEmail(loginBody.email);
    if (!user) {
        throw new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'User does not exit.',
        });
    }
    const isPasswordMatch = await bcrypt.compare(loginBody.password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'Incorrect Password',
        });
    }
    const payload = {
        sub: user.uuid,
        iat: Date.now(),
        exp: Date.now() + config.jwt.accessTokenExpirationMinutes * 60 * 1000,
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
