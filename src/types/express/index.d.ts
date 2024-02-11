import { User as AppUser } from '@repositories/user.repository.ts';
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
