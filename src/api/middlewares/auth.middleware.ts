import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '@utilities/ApiError.js';
import { rolePermissionMap } from '@config/roles.js';
import { Request, Response, NextFunction } from 'express';
import { User } from '@repositories/user.repository.js';

const verifyCallback =
    (req: Request, resolve: Function, reject: Function, requiredPermissions: string[]) =>
    async (err: Error, user: User, info: any) => {
        if (err || info || !user) {
            return reject(
                new ApiError({
                    statusCode: httpStatus.UNAUTHORIZED,
                    message: httpStatus[httpStatus.UNAUTHORIZED],
                }),
            );
        }
        req.user = user;

        if (requiredPermissions.length) {
            const userPermissions: string[] | undefined = rolePermissionMap.get(String(user.role));
            let hasRequiredPermissions;
            if (userPermissions) {
                hasRequiredPermissions = requiredPermissions.every((requiredPermission) =>
                    userPermissions.includes(requiredPermission),
                );
            }
            if (!hasRequiredPermissions && req.params.userId !== user.id) {
                return reject(
                    new ApiError({
                        statusCode: httpStatus.FORBIDDEN,
                        message: httpStatus[httpStatus.FORBIDDEN],
                    }),
                );
            }
        }

        resolve();
    };

const auth =
    (...requiredPermissions: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verifyCallback(req, resolve, reject, requiredPermissions),
            )(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };

export default auth;
