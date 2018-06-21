import { ErrorOutlet, ErrorPayload, Error } from './errors.models';
import { Action } from '../store/store.models';

export class ErrorActions {
    static ADD = '[Error] Add Error';
    static REMOVE = '[Error] Remove Error';
    static HANDLE_ERROR = '[Error Handler] Handle Error';
    static THROW_ERROR = '[Error Handler] Throw Error';

    static addAtOutlet(e: Error, outlet: ErrorOutlet): Action {
        let payload: ErrorPayload = {
            key: outlet.key,
            error: outlet.handler ? outlet.handler(e) : e
        };
        return ErrorActions.add(payload);
    }

    static addError(key: string, e: Error): Action {
        let payload: ErrorPayload = {
            key: key,
            error: e
        };
        return ErrorActions.add(payload);
    }

    static add(payload: ErrorPayload): Action {
        return {
            type: ErrorActions.ADD,
            payload: payload
        };
    }

    static remove(key: string): Action {
        return {
            type: ErrorActions.REMOVE,
            payload: key
        };
    }
}
