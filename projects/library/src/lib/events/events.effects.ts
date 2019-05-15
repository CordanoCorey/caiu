import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EventActions, MessagesActions } from './events.actions';
import { Events, MessageSubscription } from './events.models';
import { messageSubscriptionsSelector } from './events.selectors';
import { Action } from '../store/models';
import { build } from '../shared/utils';

@Injectable()
export class EventEffects {
  events: Events = new Events();

  /**
   * Trigger event if action is a registered trigger.
   */
  @Effect() onTriggerEvent: Observable<Action> = this.actions$.pipe(
    filter(action => this.events.actions.indexOf(action.type) !== -1),
    map(this.trigger)
  );

  constructor(private actions$: Actions, private store: Store<any>) {
    this.store
      .select(s => s['events'])
      .subscribe(events => {
        this.events = events;
      });
  }

  trigger(action: Action): Action {
    return EventActions.triggerEvent(action);
  }
}

@Injectable()
export class MessagesEffects {
  messageSubscriptions: MessageSubscription[] = [];

  /**
   * Broadcast message if action has a registered subscription.
   */
  @Effect() onTriggerEvent: Observable<Action> = this.actions$.pipe(
    filter(
      action =>
        this.messageSubscriptions.findIndex(x => x.action === action.type) !==
        -1
    ),
    map(x => this.broadcast(x, this.messageSubscriptions))
  );

  constructor(private actions$: Actions, private store: Store<any>) {
    messageSubscriptionsSelector(store).subscribe(x => {
      if (x && Array.isArray(x)) {
        this.messageSubscriptions = x;
      }
    });
  }

  broadcast(
    action: Action,
    messageSubscriptions: MessageSubscription[]
  ): Action {
    const subscription = build(
      MessageSubscription,
      messageSubscriptions.find(x => x.action === action.type)
    );
    return MessagesActions.add(subscription, action);
  }
}
