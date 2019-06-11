import { LookupActions } from './lookup.actions';
import { Lookups, Lookup } from './lookup.models';
import { AppActions } from '../store/actions';
import { Action } from '../store/models';
import { build, toArray } from '../shared/utils';

export function lookupReducer(
  state: Lookups = new Lookups(),
  action: Action
): Lookups {
  switch (action.type) {
    case LookupActions.ADD_KEYS:
      return Lookups.AddLookups(
        state,
        toArray(action.payload).map(x => build(Lookup, x))
      );

    case LookupActions.ADD_KEY:
      return Lookups.AddLookup(state, action.payload);

    case LookupActions.UPDATE_VALUE:
      return Lookups.UpdateLookupValue(
        state,
        action.payload.lookupKey,
        action.payload.lookupValue
      );

    case LookupActions.ADD_VALUES:
      return Lookups.AddLookups(state, action.payload);

    case LookupActions.REMOVE_KEY:
      return Lookups.RemoveLookup(state, action.payload);

    case LookupActions.REMOVE_VALUE:
      return Lookups.RemoveLookupValue(
        state,
        action.payload.lookupKey,
        action.payload.lookupValueId
      );

    case AppActions.INIT_STORE:
      return build(Lookups, action.payload['lookup']);

    default:
      return state;
  }
}
