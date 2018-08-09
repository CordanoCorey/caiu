import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EventActions } from './events.actions';
import { Events } from './events.models';
import { Action } from '../store/models';

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

    constructor(
        private actions$: Actions,
        private store: Store<any>
    ) {
        this.store.select(s => s['events'])
            .subscribe(events => {
                this.events = events;
            });
    }

    trigger(action: Action): Action {
        return EventActions.triggerEvent(action);
    }

}
