export class Error {
    message?: string = '';
    data?: any;
    statusCode?: number = 0;
}

export interface ErrorOutlet {
    key: string;
    handler?: (e: Error) => Error;
}

export interface ErrorPayload {
    key: string;
    error: Error;
}
