import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Events, Event } from './events.models';
import { Dictionary } from '../shared/models';


export function eventsSelector(store: Store<any>): Observable<Dictionary<Event>> {
    return store.select(s => s['events']).pipe(
        map((events: Events) => events.items)
    );
}

export function eventSelector(store: Store<any>, key: string): Observable<Event> {
    return eventsSelector(store).pipe(
        map(events => events[key])
    );
}

export function eventValueSelector(store: Store<any>, key: string): Observable<any> {
    return eventSelector(store, key).pipe(
        map(e => e ? e.value : null)
    );
}
