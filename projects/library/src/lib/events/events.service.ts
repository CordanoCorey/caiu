import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { combineLatest, skip, take } from 'rxjs/operators';

import { EventActions } from './events.actions';
import { eventValueSelector } from './events.selectors';
import { HttpAction } from '../http/http.models';
import { Action } from '../store/store.models';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventIndex = 0;
  events: Event[] = [];

  constructor(public store: Store<any>) {
  }

  get eventKey(): string {
    this.eventIndex++;
    return `event-${this.eventIndex}`;
  }

  addEvent(actionType: string, handler?: (action: Action) => any): string {
    const f = handler ? handler : (action: Action) => true;
    const actionWithKey = EventActions.addEvent(actionType, f, false);
    this.store.dispatch(actionWithKey);
    return actionWithKey.key;
  }

  dispatch(action: HttpAction, handler?: (action: Action) => any): Observable<any> {
    return this.dispatchHttpAction(action, handler);
  }

  dispatchHttpAction(action: HttpAction, handler?: (action: Action) => any): Observable<any> {
    const successAction = action.payload.onSuccess;
    const errorAction = typeof (action.payload.onError) === 'string' ? action.payload.onError : null;
    const success = this.takeOne(successAction, handler);
    const obs = errorAction ? success.pipe(
      combineLatest(this.takeOne(errorAction, handler), (x, y) => true)
    ) : success;
    this.store.dispatch(action);
    return obs;
  }

  removeEvent(eventKey: string) {
    this.store.dispatch(EventActions.removeEvent(eventKey));
  }

  subscribe(action: string, handler: (e: any) => void): Subscription {
    return this.take(1, action).subscribe(handler);
  }

  take(n = 1, actionType: string, handler?: (action: Action) => any): Observable<any> {
    const key = this.addEvent(actionType, handler);
    return eventValueSelector(this.store, key).pipe(
      skip(1),
      take(n)
    );
  }

  takeFrom(n = 1, actions: string[], handler?: (action: Action) => any): Observable<any> {
    const keys = actions.map(action => this.addEvent(action, handler));
    return keys.map(key => eventValueSelector(this.store, key))
      .reduce((acc, obs) => {
        return acc.pipe(
          combineLatest(obs, (x, y) => true)
        );
      }, of(false)).pipe(
        skip(1),
        take(n)
      );
  }

  takeOne(actionType: string, handler?: (action: Action) => any): Observable<any> {
    return this.take(1, actionType, handler);
  }

}
