import { ErrorOutlet } from '../errors/errors.models';

export interface HttpAction {
    type: string;
    payload: HttpActionPayload<any>;
}

export interface HttpActionPayload<T> {
    path: string;
    model?: T;
    options?: HttpOptions;
    headers?: any;
    onSuccess?: string;
    onError?: string | ErrorOutlet;
}

export class HttpDeletePayload<T> implements HttpActionPayload<T> {
    path = '';
    options: HttpOptions = new HttpOptions();
    headers?: any = undefined;
    onSuccess?= '';
    data?: any;
    onError?: string | ErrorOutlet;
}

export class HttpGetPayload<T> implements HttpActionPayload<T> {
    path = '';
    options: HttpOptions = new HttpOptions();
    headers?: any = undefined;
    onSuccess?= '';
    onError?: string | ErrorOutlet;
}

export class HttpPutPayload<T> implements HttpActionPayload<T> {
    path = '';
    model: T = null;
    options: HttpOptions = new HttpOptions();
    headers?: any = undefined;
    onSuccess?= '';
    onError?: string | ErrorOutlet;
}

export class HttpPostPayload<T> implements HttpActionPayload<T> {
    path = '';
    model: T = null;
    options: HttpOptions = new HttpOptions();
    headers?: any = undefined;
    onSuccess?= '';
    onError?: string | ErrorOutlet;
}

export enum HTTP_REQUEST_STATUS {
    PENDING,
    ERROR,
    SUCCESS
}

export enum HTTP_STATUS_CODES {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    REQUEST_ENTITY_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505
}

export class HttpOptions {
    prependBaseUrl = true;
}
