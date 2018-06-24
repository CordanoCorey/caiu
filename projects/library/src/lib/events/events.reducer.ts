import { EventActions } from './events.actions';
import { Events } from './events.models';
import { Action } from '../store/store.models';

export function eventsReducer(state: Events = new Events(), action: Action): Events {
    switch (action.type) {

        case EventActions.ADD_EVENT:
            return state.addEvent(action.payload);

        case EventActions.REMOVE_EVENT:
            return state.removeEvent(action.payload);

        case EventActions.TRIGGER_EVENT:
            return state.triggerEvent(action.payload);

        case EventActions.UPDATE_VALUE:
            return state.updateValue(action.payload);

        default:
            return state;
    }
}
