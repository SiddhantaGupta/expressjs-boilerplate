import { User as AppUser } from '@database/repositories/user.repository.ts';
export {};

declare global {
    namespace Express {
        export interface User extends AppUser {}

        export interface Request {
            locals?: any;
        }

        export interface Response {
            __custombody__?: any;
        }
    }
}
