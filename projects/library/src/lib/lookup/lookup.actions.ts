import { AddLookupPayload, Lookup } from './lookup.models';
import { Action } from '../store/models';

export class LookupActions {
    static ADD_KEYS = '[Lookup] Add keys';
    static ADD_KEY = '[Lookup] Add key';
    static ADD_VALUES = '[Lookup] Add values';
    static REMOVE_KEY = '[Lookup] Remove key';

    static addKey(payload: AddLookupPayload): Action {
        return {
            type: LookupActions.ADD_KEY,
            payload: payload
        };
    }

    static addValues(payload: Lookup[]): Action {
        return {
            type: LookupActions.ADD_VALUES,
            payload: payload
        };
    }

    static removeKey(key: string): Action {
        return {
            type: LookupActions.REMOVE_KEY,
            payload: key
        };
    }

}
