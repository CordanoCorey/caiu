import {
    HttpAction,
    HttpGetPayload,
    HttpPutPayload,
    HttpPostPayload,
    HttpActionPayload,
    HttpDeletePayload
} from './http.models';
import { ErrorActions } from '../errors/errors.actions';
import { ErrorOutlet, ErrorPayload } from '../errors/errors.models';
import { Action } from '../store/models';
import { inArray } from '../shared/utils';

export class HttpActions {

    static DELETE = `[Http] DELETE`;
    static DELETE_SUCCESS = `[Http] DELETE Success`;
    static DELETE_ERROR = `[Http] DELETE Error`;
    static GET = `[Http] GET`;
    static GET_SUCCESS = `[Http] GET Success`;
    static GET_ERROR = `[Http] GET Error`;
    static POST = `[Http] POST`;
    static POST_SUCCESS = `[Http] POST Success`;
    static POST_ERROR = `[Http] POST Error`;
    static POST_FORM_URL_ENCODED = `[Http] POST Form URL Encoded`;
    static PUT = `[Http] PUT`;
    static PUT_SUCCESS = `[Http] PUT Success`;
    static PUT_ERROR = `[Http] PUT Error`;
    static SEARCH = `[Http] SEARCH`;
    static SEARCH_SUCCESS = `[Http] SEARCH Success`;
    static SEARCH_ERROR = `[Http] SEARCH Error`;

    static addPath(path, target) {
        const existingMatches = target['matches'] || [];
        const matches = inArray(existingMatches, path) ? existingMatches : [...existingMatches, path];
        return Object.assign(target, { matches: matches });
    }

    static matchPath(path, payload) {
        if (payload && payload['results']) {
            return Object.assign(payload, { results: HttpActions.matchPath(path, payload['results']) });
        }
        if (Array.isArray(payload)) {
            return payload.map(x => HttpActions.addPath(path, x));
        }
        return HttpActions.addPath(path, payload);
    }

    static buildError(payload: ErrorPayload): Action {
        return ErrorActions.add(payload);
    }

    static buildErrorPayload(key: string, e: Error): ErrorPayload {
        return {
            key: key,
            error: e
        };
    }

    static handleError(e: Error, onError: string): Action {
        return {
            type: onError,
            payload: e
        };
    }

    static handleErrorOutlet(e: Error, outlet: ErrorOutlet): Action {
        return ErrorActions.addAtOutlet(e, outlet);
    }

    static handleErrorDefault(e: Error): Action {
        return {
            type: HttpActions.DELETE_ERROR,
            payload: HttpActions.buildErrorPayload('lastError', e)
        };
    }

    static delete(path: string, onSuccessPayload: any, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpDeletePayload<any>(),
            {
                path: path,
                onSuccess: onSuccess || HttpActions.DELETE_SUCCESS,
                onSuccessPayload,
                onError: onError || HttpActions.DELETE_ERROR
            });
        return HttpActions.httpDelete(payload);
    }

    static httpDelete(payload: HttpDeletePayload<any>): HttpAction {
        return {
            type: HttpActions.DELETE,
            payload: payload
        };
    }

    static deleteSuccess(model: any, actionType?: string): HttpAction {
        return {
            type: actionType || HttpActions.DELETE_SUCCESS,
            payload: model
        };
    }

    static deleteError(e: Error, onError?: string | ErrorOutlet): Action {
        if (typeof onError === 'string') {
            return HttpActions.handleError(e, onError);
        }
        // else if (typeof onError === 'ErrorOutlet') {
        //     return HttpActions.handleErrorOutlet(e, onError);
        // }
        return HttpActions.handleErrorDefault(e);
    }

    static get(path: string, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpGetPayload<any>(),
            {
                path: path,
                onSuccess: onSuccess || HttpActions.GET_SUCCESS,
                onError: onError || HttpActions.GET_ERROR
            });
        return HttpActions.httpGet(payload);
    }

    static httpGet(payload: HttpGetPayload<any>): HttpAction {
        return {
            type: HttpActions.GET,
            payload: payload
        };
    }

    static getSuccess(response: any, actionType?: string): HttpAction {
        return {
            type: actionType || HttpActions.GET_SUCCESS,
            payload: response
        };
    }

    static getError(e: Error, onError?: string | ErrorOutlet): Action {
        if (typeof onError === 'string') {
            return HttpActions.handleError(e, onError);
        }
        // else if (typeof onError === 'ErrorOutlet') {
        //     return HttpActions.handleErrorOutlet(e, onError);
        // }
        return HttpActions.handleErrorDefault(e);
    }

    static post(path: string, model: any, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpPostPayload<any>(),
            {
                path: path,
                model: model,
                onSuccess: onSuccess || HttpActions.POST_SUCCESS,
                onError: onError || HttpActions.POST_ERROR
            });
        return HttpActions.httpPost(payload);
    }

    static httpPost(payload: HttpPostPayload<any>): HttpAction {
        return {
            type: HttpActions.POST,
            payload: payload
        };
    }

    static postFormUrlEncoded(path: string, model: any, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpPostPayload<any>(),
            {
                path: path,
                model: model,
                onSuccess: onSuccess || HttpActions.GET_SUCCESS,
                onError: onError || HttpActions.GET_ERROR
            });
        return {
            type: HttpActions.POST_FORM_URL_ENCODED,
            payload
        };
    }

    static postSuccess(model: any, actionType?: string): HttpAction {
        return {
            type: actionType || HttpActions.POST_SUCCESS,
            payload: model
        };
    }

    static postError(e: Error, onError?: string | ErrorOutlet): Action {
        if (typeof onError === 'string') {
            return HttpActions.handleError(e, onError);
        } else if (typeof onError === 'object') {
            return HttpActions.handleErrorOutlet(e, onError);
        }
        return HttpActions.handleErrorDefault(e);
    }

    static put(path: string, model: any, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpPutPayload<any>(),
            {
                path: path,
                model: model,
                onSuccess: onSuccess || HttpActions.PUT_SUCCESS,
                onError: onError || HttpActions.PUT_ERROR
            });
        return HttpActions.httpPut(payload);
    }

    static httpPut(payload: HttpPutPayload<any>): HttpAction {
        return {
            type: HttpActions.PUT,
            payload: payload
        };
    }

    static putSuccess(model: any, actionType?: string): HttpAction {
        return {
            type: actionType || HttpActions.PUT_SUCCESS,
            payload: model
        };
    }

    static putError(e: Error, onError?: string | ErrorOutlet): Action {
        if (typeof onError === 'string') {
            return HttpActions.handleError(e, onError);
        }
        // else if (typeof onError === 'ErrorOutlet') {
        //     return HttpActions.handleErrorOutlet(e, onError);
        // }
        return HttpActions.handleErrorDefault(e);
    }

    static search(path: string, onSuccess?: string, onError?: string | ErrorOutlet): HttpAction {
        const payload = Object.assign(new HttpGetPayload<any>(),
            {
                path: path,
                onSuccess: onSuccess || HttpActions.SEARCH_SUCCESS,
                onError: onError || HttpActions.SEARCH_ERROR
            });
        return {
            type: HttpActions.SEARCH,
            payload: payload
        };
    }

    static searchSuccess(response: any, actionType?: string, path?: string): HttpAction {
        const payload = path ? HttpActions.matchPath(path, response) : response;
        return {
            type: actionType || HttpActions.SEARCH_SUCCESS,
            payload: payload
        };
    }

}
