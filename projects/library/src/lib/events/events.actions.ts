import { Event, UpdateValuePayload } from './events.models';
import { Action, ActionWithKey } from '../store/models';
import { build, guid } from '../shared/utils';

export class EventActions {
    static ADD_EVENT = '[Events] Add Event';
    static REMOVE_EVENT = '[Events] Remove Event';
    static TRIGGER_EVENT = '[Events] Trigger Event';
    static UPDATE_VALUE = '[Events] Update Value';

    static addEvent(onAction: string | string[], handler?: (action: Action) => any, value = null): ActionWithKey {
        const e: Event = build(Event, {
            onAction,
            handler,
            value,
            key: guid()
        });
        return {
            type: EventActions.ADD_EVENT,
            payload: e,
            key: e.key
        };
    }

    static removeEvent(key: string): Action {
        return {
            type: EventActions.REMOVE_EVENT,
            payload: key
        };
    }

    static triggerEvent(action: Action): Action {
        return {
            type: EventActions.TRIGGER_EVENT,
            payload: action
        };
    }

    static updateValue(key: string, value: any): Action {
        const payload = build(UpdateValuePayload,
            {
                key,
                value
            }
        );
        return {
            type: EventActions.UPDATE_VALUE,
            payload: payload
        };
    }

}
