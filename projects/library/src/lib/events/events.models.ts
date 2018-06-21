import { Action } from '../store/store.models';
import { Collection } from '../shared/collection';
import { Dictionary } from '../shared/models';

export class Event {
    emittedCount = 0;
    handler: (action: Action) => any;
    key = '';
    onAction: string | string[] = '';
    value: any = null;
}

export class Events extends Collection<Event> {

    get actions(): string[] {
        return this.toArray().reduce((acc: any[], event: Event) => {
            const addValues = !event.onAction ?
                [] : typeof event.onAction === 'string' ?
                    acc.indexOf(event.onAction) === -1 ? [event.onAction] : []
                    : event.onAction.filter(x => acc.indexOf(x) === -1);
            return [...acc, ...addValues];
        }, []);
    }

    get eventsByAction(): Dictionary<Event[]> {
        return this.toArray().reduce((acc: Dictionary<Event[]>, event: Event) => {
            if (typeof event.onAction === 'string') {
                const val: Event[] = acc[event.onAction] || [];
                acc[event.onAction] = [...val, event];
            } else {
                event.onAction.forEach(actionType => {
                    const val: Event[] = acc[actionType] || [];
                    acc[actionType] = [...val, event];
                });
            }
            return acc;
        }, {});
    }

    getActionEvents(actionType: string): Event[] {
        return this.eventsByAction[actionType];
    }

}

export class UpdateValuePayload {
    key: string;
    value: any;
}
