import { Request, Response, NextFunction } from 'express';

const tryCatch =
    (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            next(err);
        }
    };

export default tryCatch;
