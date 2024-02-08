export {};

declare global {
    namespace Express {
        export interface Request {
            user?: any;
            locals?: any;
        }

        export interface Response {
            __custombody__?: any;
        }
    }
}
