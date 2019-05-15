import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import {
  Events,
  Event,
  Messages,
  MessageSubscription,
  Message
} from './events.models';
import { Dictionary } from '../shared/models';
import { truthy, build } from '../shared/utils';

export function eventsSelector(
  store: Store<any>
): Observable<Dictionary<Event>> {
  return store
    .select(s => s['events'])
    .pipe(map((events: Events) => events.items));
}

export function eventSelector(
  store: Store<any>,
  key: string
): Observable<Event> {
  return eventsSelector(store).pipe(map(events => events[key]));
}

export function eventValueSelector(
  store: Store<any>,
  key: string
): Observable<any> {
  return eventSelector(store, key).pipe(map(e => (e ? e.value : null)));
}

export function messagesSelector(store: Store<any>): Observable<Messages> {
  return store.select('messages');
}

export function messageSubscriptionsSelector(
  store: Store<any>
): Observable<MessageSubscription[]> {
  return messagesSelector(store).pipe(map(x => x.subscriptions));
}

export function messageSelector(
  store: Store<any>,
  channel: string
): Observable<string> {
  return messagesSelector(store).pipe(
    map(x => build(Message, x.get(channel)).message),
    filter(x => truthy(x))
  );
}
