import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Action } from '../store/models';

export class StreamActions {
  static UPDATE = '[Stream] UPDATE';

  static update(payload: Action): Action {
    return {
      type: StreamActions.UPDATE,
      payload
    };
  }
}

export function actionsStreamReducer(state: Action = null, action: Action): Action {

  switch (action.type) {
    case StreamActions.UPDATE:
      return action;

    default:
      return state;
  }
}


@Injectable()
export class ActionsEffects {

  /**
   * Update actions store with latest action
   */
  @Effect() onAction: Observable<Action> = this.actions$.pipe(
    filter(action => action.type !== StreamActions.UPDATE),
    map(action => StreamActions.update(action))
  );

  constructor(private actions$: Actions) {
  }
}

export function actionsStreamSelector(store: Store<any>): Observable<Action> {
  return store.select('actions');
}
