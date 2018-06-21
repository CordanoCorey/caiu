import { ErrorActions } from './errors.actions';
import { Collection } from '../shared/collection';
import { Dictionary } from '../shared/models';
import { Action } from '../store/store.models';


export function errorsReducer(state: Dictionary<Error> = {}, action: Action): Dictionary<Error> {
    switch (action.type) {

        case ErrorActions.ADD:
            let newState = Collection.AddItem(state, 'lastError', action.payload.error);
            if (action.payload.key === 'lastError') {
                return newState;
            }
            return Collection.AddItem(state, action.payload.key, action.payload.error);

        case ErrorActions.REMOVE:
            return Collection.RemoveItem(state, action.payload);

        default:
            return state;
    }
}
