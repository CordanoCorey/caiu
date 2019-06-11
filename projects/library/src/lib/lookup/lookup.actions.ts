import { AddLookupPayload, Lookup, LookupValue } from './lookup.models';
import { Action } from '../store/models';

export class LookupActions {
  static ADD_KEYS = '[Lookup] Add keys';
  static ADD_KEY = '[Lookup] Add key';
  static ADD_VALUES = '[Lookup] Add values';
  static REMOVE_KEY = '[Lookup] Remove key';
  static REMOVE_VALUE = '[Lookup] Remove value';
  static UPDATE_VALUE = '[Lookup] Update value';

  static addKey(payload: AddLookupPayload): Action {
    return {
      type: LookupActions.ADD_KEY,
      payload: payload
    };
  }

  static addValue(lookupKey: string, lookupValue: LookupValue): Action {
    return {
      type: LookupActions.UPDATE_VALUE,
      payload: { lookupKey, lookupValue }
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

  static removeValue(lookupKey: string, lookupValueId: number): Action {
    return {
      type: LookupActions.REMOVE_VALUE,
      payload: { lookupKey, lookupValueId }
    };
  }

  static updateValue(lookupKey: string, lookupValue: LookupValue): Action {
    return {
      type: LookupActions.UPDATE_VALUE,
      payload: { lookupKey, lookupValue }
    };
  }
}
