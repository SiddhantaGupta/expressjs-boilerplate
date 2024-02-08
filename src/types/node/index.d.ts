export {};

declare global {
    export interface Error {
        statusCode?: number;
    }
}
